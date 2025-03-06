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
import { inject } from 'vue'
// on peut faire un inject car on a utilsier provide dans le composant App.vue
// doc : https://vuejs.org/guide/components/provide-inject
const membre = inject('membreConnecte')

const listeGenres = ref([]) // listeGenres : va être utilisé pour remplir notre select de Genre
const listeParticipants = ref([]) // listeGenres : va être utilisé pour remplir notre select de Participant
const route = useRoute() // on garde une reference sur la route courante
const film = ref({
  titre: '',
  genre: { id: '' },
  realisateur: { id: '' },
  acteurs: []
})



/*********************************************
 * **************** FONCTIONS ********************
 * *******************************************/

//Fonction qui ajoute la tâche via une requête HTTP sur l'API
// comme j'utilise await dans ma fonction, je dois préciser qu'elle est "asynchrone"
async function ajouterFilm() {
  // await : je vais avoir le retour de cette appel au bout d'un certain temps (j'attends)
  // dans ma requête http je vais envoyer la valeur de ma tâche ( film.value) 
  // qui a été mise à jour via le formulaire (v-model="film")
  await axios.post("/films", film.value)
  router.push('/films') // si tout se passe bien, je vais sur la liste des films

}

/*************************************************************
 * **************** INITIALISATION DU COMPOSANT **************
 * ***********************************************************/
async function init() {

  // initialise la liste des Genres
  let reponseHTTP = await axios.get('/genres')
  listeGenres.value = reponseHTTP.data

  // initialise la liste des Participants
  reponseHTTP = await axios.get('/participants')
  listeParticipants.value = reponseHTTP.data

  // si jamais on est sur la route de détail (avec un id) => on recupère le film
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
    <h2 v-if="film.id">
      Détail du film : {{ film.titre }}
       <!-- v-if="membre && membre.id" : on ne va afficher ce lien QUE si un membre existe et est connecté -->
      <RouterLink v-if="membre && membre.id" :to="`/films/${film.id}/avis`" class="action-button">ajouter avis</RouterLink>
    </h2>
    <h2 v-else>Nouveau Film</h2>

    <form method="post" @submit.prevent="ajouterFilm">

      <!-- Genre -->      
      <!-- On utilise le composant SelectFormElement en passant en options la valeur de listeGenres -->   
      <SelectFormElement label="Genre" v-model:field="film.genre" :options="listeGenres"
        :displayElement="genre => genre.titre" :disabled="film.id"/>

      <!-- Année -->
      <FormElement label="Année" type="number" v-model:field="film.annee" :disabled="film.id"/>

      <!-- Titre -->
      <FormElement label="Titre" v-model:field="film.titre" :disabled="film.id"/>

      <!-- Réalisateur -->
      <SelectFormElement label="Réalisateur" v-model:field="film.realisateur" :options="listeParticipants"
        :displayElement="participant => `${participant.prenom} ${participant.nom}`":disabled="film.id"/>
      
      <!-- Durée -->
      <FormElement label="Durée" type="number" v-model:field="film.duree" :disabled="film.id"/>
      
      <!-- Acteurs : on affiche une liste si on est sur la vue de détail (v-if="film.id"), une select sinon (v-else) -->
      <DisplayUlElement label="Acteurs" :elements="film.acteurs"
        :displayElement="participant => `${participant.prenom} ${participant.nom}`" v-if="film.id"/>
      <SelectFormElement multiple label="Acteurs" v-model:field="film.acteurs" :options="listeParticipants"
        :displayElement="participant => `${participant.prenom} ${participant.nom}`" v-else/>

      <!-- Synopsis -->
      <TextareaFormElement label="Synopsis" v-model:field="film.synopsis" :disabled="film.id"/>
      
      <SubmitButton v-if="!film.id"/>

       <!-- si le film a un id ET qu'il a des avis, on les affiche-->
       <div class="form-element" v-if="film.id && film.avis.length > 0">
            <label>Avis</label>
            <ul>
               <li v-for="avis in film.avis">{{avis.note}} : {{avis.commentaire}} ({{avis.membre.pseudo}})</li>
            </ul>
        </div>


    </form>

  </main>
</template>