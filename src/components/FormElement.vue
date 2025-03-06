<script setup>
// les propriétés des composants doivent être speciées dans <script setup> via defineProps(['label'])
defineProps(['label', 'type', 'disabled']) // on va pouvoir utiliser la valeur de la propriété label dans le template avec {{label}}, etc...

// ici, on specifie que la variable de notre model field est "bindé" à l'attribut <FormElement v-model:field="XXX"/> 
const field = defineModel('field')

</script>


<template>
  <div class="form-element">
        <label>{{label}}</label>
        <!-- :type="type : permet de choisir le type avce text par défaut -->
        <!-- v-model : permet de "binder" le champs de saisie à la valeur de ma variable réactive : tache -->
        <input :type="type || 'text'" v-model="field" :disabled="disabled">
      </div>
</template>