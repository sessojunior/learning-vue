<template>
  <div>
    <p>Dados do usuário:</p>
    <p>{{ user.id }} - {{ user.name }} - {{ user.status }}</p> 
  </div>
</template>

<script setup>
import { ref } from 'vue'
const user = ref({
  id: 1,
  name: 'Mario Junior',
  status: 'active'
})

</script>

<style scoped>

</style>