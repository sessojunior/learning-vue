<script setup>
import { ref } from 'vue'
const count = ref(0)
const isButtonDisabled = true
const url = 'https://www.google.com.br'

function calculate() {
  count.value++
}
</script>

<template>
  <div>
    <h1>Hello World!</h1>
    <button @click="count++">Aumentar</button>
    <button @click="count--">Diminuir</button>
    <button @click="calculate">Calcular</button>
    <p>Contagem: {{ count }}</p>
    <button :disabled="isButtonDisabled">Button</button>
    <a :href="url">teste</a>
  </div>
</template>

<style scoped>
  h1 {
    color: red;
  }
</style>