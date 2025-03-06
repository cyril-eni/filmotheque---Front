<script setup>
import { ref, onMounted } from 'vue'
// @ correspond au repertoire src de notrre appli
import FormElement from '@/components/FormElement.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import SelectFormElement from '@/components/SelectFormElement.vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import axios from '@/axios/instance' // j'importe l'instance d'axios définie dans /axios/instance.js
import TextareaFormElement from '@/components/TextareaFormElement.vue'
import DisplayUlElement from '@/components/DisplayUlElement.vue'

const listeGenres = ref([]) // listeGenres : va être utilisé pour remplir notre select de Genre
const listeParticipants = ref([]) // listeGenres : va être utilisé pour remplir notre select de Participant
const route = useRoute() // on garde une reference sur la route courante
const film = ref({
  titre: '',
  genre: { id: '' },
  realisateur: { id: '' },
  acteurs: []
})

const avis = ref({})



/*********************************************
 * **************** FONCTIONS ********************
 * *******************************************/

//Fonction qui ajoute la tâche via une requête HTTP sur l'API
// comme j'utilise await dans ma fonction, je dois préciser qu'elle est "asynchrone"
async function ajouterAvis() {
  // await : je vais avoir le retour de cette appel au bout d'un certain temps (j'attends)
  // dans ma requête http je vais envoyer la valeur de ma tâche ( film.value) 
  // qui a été mise à jour via le formulaire (v-model="film")
  await axios.post(`/films/${film.value.id}/avis`, avis.value)
  router.push(`/films/${film.value.id}`) // si tout se passe bien, je vais sur la page de détail du film

}

/*************************************************************
 * **************** INITIALISATION DU COMPOSANT **************
 * ***********************************************************/
async function init() {

  // on recupère le film
  const idFilm = route.params.id // on recupère la valeur du paramètre id du router (défini car on utilise path: '/films/:id',)
  const result = await axios.get(`/films/${idFilm}`)
  film.value = result.data
}

// onMounted(() => {}) Bloc de code appelé au chargement du composant
onMounted(() => {
  // je charge les tâches au démarrage du composant
  init()
})
</script>


<!-- pour plus d'infos sur les syntaxes utilisées, voir commentaires dans : Genres.vue -->
<template>
  <main>
    <!-- on affiche un titre différent selon qu'on soit sur la vue de détail (v-if="film.id") ou non (v-else)  -->
    <h2>Nouvel avis du film : {{ film.titre }}</h2>

    <form method="post" @submit.prevent="ajouterAvis">

     
      <!-- Note -->
      <FormElement label="Note" type="number" v-model:field="avis.note" />
      
      <!-- Commentaire -->
      <TextareaFormElement label="Commentaire" v-model:field="avis.commentaire"/>
      
      <SubmitButton/>
    </form>

  </main>
</template>