<script setup>
// les propriétés des composants doivent être speciées dans <script setup> via defineProps(['label'])
defineProps(['label', 'disabled']) // on va pouvoir utiliser la valeur de la propriété label dans le template avec {{label}}, etc...

// ici, on specifie que la variable de notre model field est "bindé" à l'attribut <FormElement v-model:field="XXX"/> 
const field = defineModel('field')

</script>


<template>
  <div class="form-element">
        <label>{{label}}</label>
        <textarea v-model="field" row="8" cols="50" :disabled="disabled"></textarea>
      </div> 
</template>