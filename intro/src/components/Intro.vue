<template>
  <div>
    <p>Links: <a :href="urlGoogle">Google</a> <a v-bind:href="urlYoutube">Youtube</a></p>
    <button @click="exibirAlerta('Um alerta com string')">Exibir alerta</button>
    <button @click.once="exibirAlerta('Um alerta uma vez apenas com .once')">Exibir alerta uma vez</button>
    <hr>
    <p>Contador: {{ count }}</p>
    <button @click="count++">Aumentar 1</button>
    <button @click="count--">Diminuir 1</button>
    <button v-on:click="calculate(10)">Aumentar 10</button>
    <hr>
    <button :disabled="isButtonDisabled">Botão desabilitado</button>
    <button :disabled="!isButtonDisabled">Botão ativo</button>
    <hr>
    <p>Two way data-bind:</p>
    <input type="text" name="nome" value="" v-model="name" />
    <input type="text" v-bind:value="name" v-on:input="name = $event.target.value" />
    <button type="submit">Enviar</button>
    <p>Resultado: <span id="result">{{ name }}</span> - <button @click="alterarNome('José')">Alterar nome</button></p>
    <p v-once>Nome: {{ name }} (Usando v-once)</p>
    <hr>
    <p>Propriedade computada (quantidade de letras): {{ quantidadeLetrasNome }}</p>
    <p>Precisa ser síncrono, retornar algo para o usuário</p>
    <hr>
    <p>Watchs</p>
    <p>Altere o nome e irá aparecer depois de 3 segundos: {{ resultName }}</p>
    <p>Semelhante às propriedades computadas, mas pode ser assíncrono. Funciona como um efeito colateral, após a mudança de uma variável</p>
    <hr>
    <p>Alterando uma classe</p>
    <button @click="toggleColor">Alternar cor da caixa</button>
    <div class="box" :class="{ active: activeBox }"></div>
    <hr>
    <p v-if="auth">Usuário: {{ user }}</p>
    <p v-else>Usuário não autenticado</p>
    <p v-show="auth">Está autenticado (v-show: quando não logado muda para display: none)</p>
    <button @click="auth = !auth">
      {{ auth ? 'Sair' : 'Entrar' }}
    </button>
    <hr>
    <p>Lista de teconlogias - array de strings</p>
    <ul>
      <li v-for="(tech, index) in techs" :key="index">{{ index }} - {{ tech }}</li>
    </ul>
    <p>Lista de alunos - array de objetos</p>
    <ul>
      <li v-for="aluno in alunos" :key="aluno.id">{{ aluno.id }} - {{ aluno.nome }} - {{ aluno.status }}</li>
    </ul>
    <hr>
    <User />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

import User from './User.vue'

const count = ref(0)
const isButtonDisabled = true
const urlGoogle = 'https://www.google.com.br'
const urlYoutube = 'https://www.youtube.com.br'

function calculate(valor) {
  console.log('Chamou alterarNome')
  count.value += valor
}

function exibirAlerta(alerta) {
  alert("Alerta dado: " + alerta)
}

function alterarNome(valor) {
  console.log('Chamou alterarNome')
  name.value = valor
}

const quantidadeLetrasNome = computed(() => {
  console.log('Chamou propriedade computada')
  return name.value.length
})

const name = ref('Nome inicial')
const resultName = ref('')

watch(name, (novoName) => {
  setTimeout(() => {
    console.log(`name agora é ${novoName}`)
    // resultName.value = novoName
  }, 3000)
})

const activeBox = ref(false)
const toggleColor = () => {
  activeBox.value = !activeBox.value
  // console.log("toggleColor", activeBox.value)
}

const user = 'Mario'
const auth = ref(true)

const techs = ['Vue.js', 'Node.js', 'React', 'Typescript', 'Express.js']
const alunos = [
  {
    id: 1,
    nome: "Fernanda",
    status: "Cursando"
  },
  {
    id: 2,
    nome: "Lucas",
    status: "Cursando"
  },
  {
    id: 3,
    nome: "Mario",
    status: "Concluido"
  },
  {
    id: 4,
    nome: "Julia",
    status: "Cursando"
  },
]
</script>

<style scoped>
  h1 {
    color: red;
  }

  .box {
    width: 100px;
    height: 100px;
    background-color: red;
  }

  .box.active {
    background-color: green;
  }
</style>