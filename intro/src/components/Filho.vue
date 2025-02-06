<template>
  <div>
    <p>Nome do curso (componente filho): {{ nomeCurso }}</p>
    <button @click="alterarNomeCurso('Nome do curso recebido do componente pai para o filho')">Alterar nome (recebendo nome do componente pai pelo :alterarNomeCurso)</button>
    <button @click="$emit('eventoFilho', 'Nome do curso passado do filho para o componente pai')">Alterar nome (passando do filho para o pai usando $emit chamando o @eventoFilho)</button>
  </div>
</template>

<script setup>
const props = defineProps({
  nomeCurso: String,
  alterarNomeCurso: Function
})
</script>

<style scoped>

</style>