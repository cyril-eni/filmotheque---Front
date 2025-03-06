<script setup>
import { ref, onMounted } from 'vue'
// @ correspond au repertoire src de notrre appli
import FormElement from '@/components/FormElement.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import TableElement from '@/components/TableElement.vue'
import axios from '@/axios/instance' // j'importe l'instance d'axios définie dans /axios/instance.js

const listeMembres = ref([]) // ma liste de membres (pour l'affichage du tableau)
const membre = ref({
  prenom : '',
  nom : '',
  pseudo : '',
  motDePasse : '',
  admin : false
}) 



/*********************************************
 * **************** FONCTIONS ********************
 * *******************************************/

//Fonction qui ajoute la tâche via une requête HTTP sur l'API
// comme j'utilise await dans ma fonction, je dois préciser qu'elle est "asynchrone"
async function ajouterMembre() {
  // await : je vais avoir le retour de cette appel au bout d'un certain temps (j'attends)
  // dans ma requête http je vais envoyer la valeur de ma tâche ( membre.value) 
  // qui a été mise à jour via le formulaire (v-model="membre")
  await axios.post("/membres", membre.value)
  // quand c'est fini, je recharge la liste des tâches
  recupererMembres()
  // et je vide le champs de saisie
  membre.value = {
  prenom : '',
  nom : '',
  pseudo : '',
  motDePasse : '',
  admin : false
}
}

//Fonction qui supprime la tâche via une requête HTTP sur l'API
// comme j'utilise await dans ma fonction, je dois préciser qu'elle est "asynchrone"
async function supprimerMembre(idMembreAsupprimer) {
  // await : je vais avoir le retour de cette appel au bout d'un certain temps (j'attends)
  // j'utilise l'équivalent des || thymeleaf en Javascript : ``  : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  // qui a été mise à jour via le formulaire (v-model="membre")
  await axios.delete(`/membres/${idMembreAsupprimer}`)
  // quand c'est fini, je recharge la liste des tâches
  recupererMembres()
}

// comme j'utilise await dans ma fonction, je dois préciser qu'elle est "asynchrone"
async function recupererMembres() {
  // await : je vais avoir le retour de cette appel au bout d'un certain temps (j'attends)
  const reponse = await axios.get("http://localhost:8080/api/membres")
  // une fois que j'ai recupérer la réponse, je vais pouvoir remplacer la valeur de ma variable listeMembres avec les données (.data) de celle-ci
  listeMembres.value = reponse.data
}

/*************************************************************
 * **************** INITIALISATION DU COMPOSANT **************
 * ***********************************************************/

// onMounted(() => {}) Bloc de code appelé au chargement du composant
onMounted(() => {
  // je charge les tâches au démarrage du composant
  recupererMembres()
})
</script>


<!-- pour plus d'infos sur les syntaxes utilisées, voir commentaires dans : Genres.vue -->
<template>
  <main>
    <h2>Ajouter un membre</h2>

    <form method="post" @submit.prevent="ajouterMembre">     
      
     <FormElement label="Prenom" v-model:field="membre.prenom"/> 
     <FormElement label="Nom" v-model:field="membre.nom"/> 
     <FormElement label="pseudo" v-model:field="membre.pseudo"/> 
     <FormElement label="MotDePasse" v-model:field="membre.motDePasse"/> 
     <FormElement label="Admin" type="checkbox" v-model:field="membre.admin"/> 
      <SubmitButton/>
    </form>

    <h2>Liste des membres</h2>
   
    <TableElement 
      :labels="['Id', 'Pseudo', 'Nom', 'Prenom', 'Pseudo', 'Mot de Passe', 'Admin', 'Action']" 
      :elements="listeMembres" 
      :fields="['id', 'pseudo', 'nom', 'prenom', 'pseudo', 'motDePasse', 'admin']"      
      @delete="(membre) => supprimerMembre(membre.id)"/>
  </main>
</template>