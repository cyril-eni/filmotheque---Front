<script setup>
import { ref, onMounted } from 'vue'
// @ correspond au repertoire src de notrre appli
import axios from '@/axios/instance' // j'importe l'instance d'axios définie dans /axios/instance.js
import { inject } from 'vue'
// on peut faire un inject car on a utilsier provide dans le composant App.vue
// doc : https://vuejs.org/guide/components/provide-inject
const membre = inject('membreConnecte')

const listeFilms = ref([]) // ma liste de participants (pour l'affichage du tableau)

const rechercheAvance = ref(false)
const recherche = ref("");

// comme j'utilise await dans ma fonction, je dois préciser qu'elle est "asynchrone"
async function recupererFilms() {
  // await : je vais avoir le retour de cette appel au bout d'un certain temps (j'attends)
  const reponse = await axios.get("/films")
  // une fois que j'ai recupérer la réponse, je vais pouvoir remplacer la valeur de ma variable listeFilms avec les données (.data) de celle-ci
  listeFilms.value = reponse.data
}

// comme j'utilise await dans ma fonction, je dois préciser qu'elle est "asynchrone"
async function rechercherFilms() {
  // await : je vais avoir le retour de cette appel au bout d'un certain temps (j'attends)
  const reponse = await axios.get(`/films`, { params : {recherche : recherche.value}})
  // une fois que j'ai recupérer la réponse, je vais pouvoir remplacer la valeur de ma variable listeFilms avec les données (.data) de celle-ci
  listeFilms.value = reponse.data
}



/*************************************************************
 * **************** INITIALISATION DU COMPOSANT **************
 * ***********************************************************/

// onMounted(() => {}) Bloc de code appelé au chargement du composant
onMounted(() => {
  // je charge les tâches au démarrage du composant
  recupererFilms()
})
</script>


<!-- pour plus d'infos sur les syntaxes utilisées, voir commentaires dans : Genres.vue -->
<template>
  <main>
    <h2>Les films de l'ENI</h2>


    <form class="search-form"  @submit.prevent="rechercherFilms">
        <!--recherche basique -->
        <div class="form-element" v-if="!rechercheAvance">
            <input v-model="recherche" placeholder="terme de recherche">
            <button>Rechercher</button>
            <a class="link" @click="() => {rechercheAvance = true}">recherche avancée</a>
        </div>
        <!--recherche avancée -->
        <div class="form-element" v-else>
            A implémenter...
            <a class="link" @click="() => {rechercheAvance = false}">recherche basique</a>
        </div>
    </form>

    <table class="full-width">
      <thead>
        <tr>
          <th>Genre</th>
          <th>Annee</th>
          <th>Titre</th>
          <th>Réalisateur</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="film in listeFilms">
          <td>{{ film.genre.titre }}</td>
          <td>{{ film.annee }}</td>
          <td>{{ film.titre }}</td>
          <td>{{ film.realisateur.prenom }} {{ film.realisateur.nom }}</td>
          <td>
            <RouterLink :to="`/films/${film.id}`" class="link">détail</RouterLink>
             <!-- v-if="membre && membre.id" : on ne va afficher ce lien QUE si un membre existe et est connecté -->
            <RouterLink v-if="membre && membre.id" :to="`/films/${film.id}/avis`" class="action-button">ajouter avis</RouterLink>
          </td>
          
        </tr>
      </tbody>
    </table>
  </main>
</template>