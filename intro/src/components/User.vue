<template>
  <div>
    <p>Dados do usuário:</p>
    <p>{{ user.id }} - {{ user.name }} - {{ user.status }}</p> 
    <p>Propriedades recebidas pelo componente:</p>
    <p>Descrição: {{ props.descricao }}</p>
    <ul>
      <li v-for="aluno in listaAlunos">
        {{ aluno.id }} - {{ aluno.nome }} - {{ aluno.status }}
      </li>
    </ul>
    <div>
      <p>Slot:</p>
      <slot></slot>
    </div>
    <div>
      <p>Slots personalizados:</p>
      <div>
        <b><slot name="header"></slot></b>
      </div>
      <div>
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const user = ref({
  id: 1,
  name: 'Mario Junior',
  status: 'active'
})

const props = defineProps({
  descricao: {
    type: String,
    required: true,
  },
  listaAlunos: Array,
})
</script>

<style scoped>

</style>