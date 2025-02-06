<template>
  <div>
    <p>Formulário de cadastro de usuário:</p>
    <form @submit.prevent="enviar">
      <div>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="user.nome">
      </div>
      <div>
        <label for="email">E-mail:</label>
        <input type="email" id="email" autocomplete="email" v-model="user.email">
      </div>
      <div>
        <label for="qtd-cursos">Quantidade de cursos:</label>
        <input type="number" id="qtd-cursos" v-model="user.qtdCursos">
      </div>
      <div>
        <label for="descricao">Descrição:</label>
        <textarea id="descricao" v-model="user.descricao"></textarea>
      </div>
      <div>
        <p>Tecnologias (checkbox):</p>
        <div>
          <input type="checkbox" value="javascript" id="javascript" v-model="user.tecnologias">
          <label for="javascript">Javascript</label>
        </div>
        <div>
          <input type="checkbox" value="php" id="php" v-model="user.tecnologias">
          <label for="php">PHP</label>
        </div>
        <div>
          <input type="checkbox" value="python" id="python" v-model="user.tecnologias">
          <label for="python">Python</label>
        </div>
      </div>
      <div>
        <p>Tema (radio):</p>
        <div>
          <input type="radio" id="light" value="light" v-model="theme">
          <label for="light">Claro</label>
        </div>
        <div>
          <input type="radio" id="dark" value="dark" v-model="theme">
          <label for="dark">Escuro</label>
        </div>
      </div>
      <div>
        <p>Tipo de contratação (select):</p>
        <label for="tipo">Tipo: </label>
        <select name="tipo" id="tipo" v-model="tipo">
          <option v-for="tipo in tipos" :key="tipo.id" :value="tipo.value">{{ tipo.label }}</option>
        </select>
      </div>
      <!-- <div>
        <button @click.prevent="enviar">Enviar</button>
      </div> -->
      <button type="submit">Enviar</button>
    </form>
  </div>
  <div v-if="resultado">
    <hr>
    <p>Dados enviados do usuário:</p>
    <p>{{ user.nome }} - {{ user.email }} - {{ user.qtdCursos }} cursos</p>
    <p>Tecnologias: {{ user.tecnologias }}</p>
    <p>Tema: {{ theme == 'light' ? 'Claro' : 'Escuro' }}</p>
    <p>Tipo: {{ tipo }} - {{ tipos.filter((t) => t.value == tipo) }} - {{ tipos.filter((t) => t.value == tipo)[0].label }}</p>
  </div>
  <hr>
</template>

<script setup>
import { ref, reactive } from 'vue'
const user = reactive({
  nome: 'Mario',
  email: 'mario.junior@email.com',
  qtdCursos: 2,
  descricao: 'Engenheiro de software',
  tecnologias: ['javascript', 'python']
})
const theme = ref('light')
const tipos = reactive([
  {
    id: 1,
    value: 'clt',
    label: 'CLT',
  },
  {
    id: 2,
    value: 'pj',
    label: 'Pessoa jurídica',
  },
  {
    id: 3,
    value: 'freelancer',
    label: 'Freelancer',
  }
])
const tipo = ref('pj')
const resultado = ref(false)

function enviar() {
  alert('Dados enviados')
  resultado.value = true
}
</script>

<style scoped>

</style>