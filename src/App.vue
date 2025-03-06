<script setup>

// on définie dans le fichier une variable axios qui prend la valeur exportée dans le fichier '@/axios/instance.js'
import axios from '@/axios/instance'
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref, provide } from 'vue'
/********************************
 *  Initialisation du modèle ****
 *********************************/

// membre : va être utilisé referencé le membre connecté
const membre = ref({})
// je rends disponible la variable membre pour les sous-composants
// je pourrai recuperer le membre dans les sous-composants avec :
// import { inject } from 'vue'
// const membre = inject('membreConnecte')
provide('membreConnecte', membre)

/**
 * On se déconnexte de l'application
 * =
 - on supprime le jwt du localstorage
 - on réinitialise la variable du modèle membre
 */
function logout(){
  // on supprime le jwt du localstorage
  localStorage.removeItem('jwt')
  // on réinitialise la variable du modèle membre
  membre.value = {}
}


/**
 * A l'initialisation de l'application
 * On va chercher les infos de l'utilisateur connecté
 */
async function init(){
  try {
    // va chercher les informations de l'utilisateur courant connexté (à partir de l'API)
    const result = await axios.get('/user')
    // si tout se passe bien, 
    // on met à jour le modèle "membre"
    membre.value = result.data



    
  } catch (error) {
    console.log('erreur lors de la récupération du membre', error);
  }
}
   // on définit ici que quand le composant se charge (onMounted), on appelle la méthode init()
  onMounted(() => {
    init()
})
</script>

<template>
  <header>
    <h2 id="titre">
        <img src="@/assets/logoFilmotheque.png" alt="logo" srcset="">
        <RouterLink to="/">Filmothèque</RouterLink>
    </h2>

    <!--liens de navigation de notre site-->
    <nav>
        <ul>
            <!-- RouterLink nous génère des liens <a> dynamiques (single page app) qui ne rechargent pas le HTML -->
            <li><RouterLink to="/films">Films</RouterLink></li>
             <!-- v-if="membre.admin" : on ne va afficher ce lien QUE si un membre est connecté avec le rôle admin-->
            <li><RouterLink v-if="membre.admin" to="/genres">Genres</RouterLink></li>
             <!-- v-if="membre.admin" : on ne va afficher ce lien QUE si un membre est connecté avec le rôle admin-->
            <li><RouterLink v-if="membre.admin" to="/participants">Participants</RouterLink></li>
             <!-- v-if="membre.admin" : on ne va afficher ce lien QUE si un membre est connecté avec le rôle admin-->
            <li><RouterLink v-if="membre.admin" to="/membres">Membres</RouterLink></li>
             <!-- v-if="membre.admin" : on ne va afficher ce lien QUE si un membre est connecté avec le rôle admin-->
            <li><RouterLink v-if="membre.admin" to="/films/nouveau">Création film</RouterLink></li>
          </ul>
    </nav>
    <!-- section de connexion -->
    <section v-if="membre.id">
      membre connecté : {{ membre.pseudo }}
      <button @click="logout">Se deconnecter</button>
    </section>
    <!-- si pas de membre de connecté : j'affiche la page de Login -->
    <section v-else>
      <RouterLink to="/login">Login</RouterLink>
    </section>
</header>
  <!-- 
    Notre balise  <RouterView /> correspond à layout:fragment="content" de thymeleaf
  => elle va être remplacée par le composant Vue qui correspond à l'url courante 
    Ces composants sont specifiés dans : router/index.js
  -->
<RouterView @login="init" />
<!-- @login : quand l'événement "login" est émit depuis un sous composant, on rappelle la méthode init() -->
  <footer>
    <span>©ENI - Tout droit reservé</span>
</footer>
</template>