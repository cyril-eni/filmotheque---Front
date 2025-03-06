<script setup>
import { ref, onMounted } from 'vue'
// @ correspond au repertoire src de notrre appli
import FormElement from '@/components/FormElement.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import TableElement from '@/components/TableElement.vue'
import axios from '@/axios/instance' // j'importe l'instance d'axios définie dans /axios/instance.js

const listeParticipants = ref([]) // ma liste de participants (pour l'affichage du tableau)
const participant = ref({
  prenom : '',
  nom : ''
}) 



/*********************************************
 * **************** FONCTIONS ********************
 * *******************************************/

//Fonction qui ajoute la tâche via une requête HTTP sur l'API
// comme j'utilise await dans ma fonction, je dois préciser qu'elle est "asynchrone"
async function ajouterParticipant() {
  // await : je vais avoir le retour de cette appel au bout d'un certain temps (j'attends)
  // dans ma requête http je vais envoyer la valeur de ma tâche ( participant.value) 
  // qui a été mise à jour via le formulaire (v-model="participant")
  await axios.post("/participants", participant.value)
  // quand c'est fini, je recharge la liste des tâches
  recupererParticipants()
  // et je vide le champs de saisie
  participant.value = {
  prenom : '',
  nom : ''
}
}

//Fonction qui supprime la tâche via une requête HTTP sur l'API
// comme j'utilise await dans ma fonction, je dois préciser qu'elle est "asynchrone"
async function supprimerParticipant(idParticipantAsupprimer) {
  // await : je vais avoir le retour de cette appel au bout d'un certain temps (j'attends)
  // j'utilise l'équivalent des || thymeleaf en Javascript : ``  : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  // qui a été mise à jour via le formulaire (v-model="participant")
  await axios.delete(`/participants/${idParticipantAsupprimer}`)
  // quand c'est fini, je recharge la liste des tâches
  recupererParticipants()
}

// comme j'utilise await dans ma fonction, je dois préciser qu'elle est "asynchrone"
async function recupererParticipants() {
  // await : je vais avoir le retour de cette appel au bout d'un certain temps (j'attends)
  const reponse = await axios.get("http://localhost:8080/api/participants")
  // une fois que j'ai recupérer la réponse, je vais pouvoir remplacer la valeur de ma variable listeParticipants avec les données (.data) de celle-ci
  listeParticipants.value = reponse.data
}

/*************************************************************
 * **************** INITIALISATION DU COMPOSANT **************
 * ***********************************************************/

// onMounted(() => {}) Bloc de code appelé au chargement du composant
onMounted(() => {
  // je charge les tâches au démarrage du composant
  recupererParticipants()
})
</script>


<!-- pour plus d'infos sur les syntaxes utilisées, voir commentaires dans : Genres.vue -->
<template>
  <main>
    <h2>Ajouter un participant</h2>

    <form method="post" @submit.prevent="ajouterParticipant">     
      
     <FormElement label="Prenom" v-model:field="participant.prenom"/> 
     <FormElement label="Nom" v-model:field="participant.nom"/> 
      <SubmitButton/>
    </form>

    <h2>Liste des participants</h2>
   
    <TableElement 
      :labels="['Id', 'Prenom', 'Nom', 'Action']" 
      :elements="listeParticipants" 
      :fields="['id', 'prenom', 'nom']"      
      @delete="(participant) => supprimerParticipant(participant.id)"/>
  </main>
</template>