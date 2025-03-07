<script setup>
import { ref, onMounted } from 'vue'
// @ correspond au repertoire src de notrre appli
import FormElement from '@/components/FormElement.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import TableElement from '@/components/TableElement.vue'
import axios from '@/axios/instance' // j'importe l'instance d'axios définie dans /axios/instance.js

/***********************************
 * **************** MODEL **********
 * *********************************/
// variable reactive = variable qui est initialisée avec une valeur ref(...) =  model
// ici je veux gérer 2 variables réactives dans mon composant (qui vont être utilisées dans le template)

const listeGenres = ref([]) // ma liste de genres (pour l'affichage du tableau)
const genre = ref({
  titre: ""
}) 



/*********************************************
 * **************** FONCTIONS ********************
 * *******************************************/

//Fonction qui ajoute la tâche via une requête HTTP sur l'API
// comme j'utilise await dans ma fonction, je dois préciser qu'elle est "asynchrone"
async function ajouterGenre() {
  // await : je vais avoir le retour de cette appel au bout d'un certain temps (j'attends)
  // dans ma requête http je vais envoyer la valeur de ma tâche ( genre.value) 
  // qui a été mise à jour via le formulaire (v-model="genre")
  await axios.post("/genres", genre.value)
  // quand c'est fini, je recharge la liste des tâches
  recupererGenres()
  // et je vide le champs de saisie
  genre.value = {
  titre: ""
}
}

//Fonction qui supprime la tâche via une requête HTTP sur l'API
// comme j'utilise await dans ma fonction, je dois préciser qu'elle est "asynchrone"
async function supprimerGenre(idGenreAsupprimer) {
  // await : je vais avoir le retour de cette appel au bout d'un certain temps (j'attends)
  // j'utilise l'équivalent des || thymeleaf en Javascript : ``  : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  // qui a été mise à jour via le formulaire (v-model="genre")
  await axios.delete(`/genres/${idGenreAsupprimer}`)
  // quand c'est fini, je recharge la liste des tâches
  recupererGenres()
}

// comme j'utilise await dans ma fonction, je dois préciser qu'elle est "asynchrone"
async function recupererGenres() {
  // await : je vais avoir le retour de cette appel au bout d'un certain temps (j'attends)
  const reponse = await axios.get("/genres")
  // une fois que j'ai recupérer la réponse, je vais pouvoir remplacer la valeur de ma variable listeGenres avec les données (.data) de celle-ci
  listeGenres.value = reponse.data
}

/*************************************************************
 * **************** INITIALISATION DU COMPOSANT **************
 * ***********************************************************/

// onMounted(() => {}) Bloc de code appelé au chargement du composant
onMounted(() => {
  // je charge les tâches au démarrage du composant
  recupererGenres()
})
</script>


<template>
  <main>
    <h2>Ajouter une genre</h2>

    <!--je gère un formulaire qui ne sera pas envoyé en HTML lorsque je le validerai
  avec @submit.prevent => ca va appeler à la place la méthode de mon script correspondante
-->
    <form method="post" @submit.prevent="ajouterGenre">
      <!-- 
      FormElement : composant qui permet de mutualiser le code des champs de saisie
      propriétés : 
      - label : définit ce qui va être affiché dans le <label>
      - v-model:field : définit la variable reacive du modèle que l'on va mettre à jour avecx ce composant -->
     <FormElement label="Genre" v-model:field="genre.titre"/> 
      <SubmitButton/>
    </form>

    <h2>Liste des genres</h2>

    <!-- 
      : en prefixe de prop = on EVALUE une expression
      sinon, on passe du texte en dur (ex : pour le label)

      TableElement : composant qui permet de mutualiser le code d'affichage d'éléments dans une table
      propriétés : 
      - :labels : définit la liste (expression donc prefixe:) de nos <th> dans la table
      - :elements : définit la variable (expression donc prefixe:) qui contient la liste des éléments à afficher
      - :fields : définit la liste (expression donc prefixe:) des attributs qu'on souhaite afficher 
      - @delete : je mets un listenner sur l'événement 'delete' qui est émis depuis le composant : je supprime la genre correspondante-->
    <TableElement 
      :labels="['Id', 'Titre', 'Action']" 
      :elements="listeGenres" 
      :fields="['id', 'titre']"      
      @delete="(genre) => supprimerGenre(genre.id)"/>
  </main>
</template>