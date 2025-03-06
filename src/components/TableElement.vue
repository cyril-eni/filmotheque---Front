<script setup>
// je définis les prporiétés que je veux utiliser : 'elements', 'labels', 'fields'
defineProps(['elements', 'labels', 'fields'])

// je définis ici les événements que je peux emmettre (ici : 'delete' lorsqu'on clique sur le bouton delete)
const emit = defineEmits(['delete'])
</script>


<template>
  <table class="full-width">
    <thead>
      <tr>
        <!-- je crée un th pour chaque label specifié dans la prop : labels -->
        <th v-for="label in labels">{{ label }}</th>
      </tr>
    </thead>
    <tbody>
      <!--je crée une ligne <tr> pour chaque element contenu dans ma prop "elements" -->
      <tr v-for="element in elements">
        <!--je crée une colonne <td> pour chaque champs contenu dans ma prop "fields" 
          element[field] : va correspondre à la valeur du champs pour l'élément courant
          -->
        <td v-for="field in fields">{{ element[field] }}</td>
        <td>
          <!-- comme on est en dehors de la vue et qu'on ne sais pas quoi faire lors de la suppression
           => je vais emmetre un évenement 'delete' à mon composant parent lorsque je clique sur le bouton -->
          <button @click="emit('delete', element);" class="delete-button">X</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>