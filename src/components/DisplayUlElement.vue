<script setup>
// les propriétés des composants doivent être speciées dans <script setup> via defineProps(['label'])
defineProps(['label', 'elements','displayElement']) // on va pouvoir utiliser la valeur de la propriété label dans le template avec {{label}}, etc...
</script>


<template>
  <div class="form-element">
    <label>{{ label }}</label>
    <ul>
      <li v-for="element in elements">{{ displayElement(element) }} </li>
    </ul>
  </div>
</template>