<script setup>
import { ref, watch, onMounted } from "vue"
import axios from "./services/axios"

const tasks = ref([])
const pendingTasks = ref([])
const completedTasks = ref([])
const newTaskTitle = ref("")

// Função para buscar as tarefas do backend
async function fetchTasks() {
  try {
    const response = await axios.get(`/tasks`)
    tasks.value = response.data
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error)
  }
}

// Função para alterar o status da tarefa
async function updateTask(task) {
  // console.log("Task", task)
  const data = {
    ...task,
    completed: !task.completed
  }
  // console.log("Task alterada", data)
  try {
    const response = await axios.put(`/tasks/${task.id}`, data)
    // O watch das tasks irá detectar a mudança automaticamente
    task.completed = response.data.completed
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error)
  }
}

// Função para apagar uma tarefa
async function deleteTask(taskId) {
  // console.log("Task ID", taskId)
  try {
    await axios.delete(`/tasks/${taskId}`)
    // Remove a tarefa da lista local após a exclusão no servidor
    tasks.value = tasks.value.filter(task => task.id !== taskId)
    alert("Tarefa excluída com sucesso!")
  }
  catch (error) {
    console.error("Erro ao excluir tarefa:", error)
  }
}

// Função para cadastrar uma tarefa
async function addTask(task) {
  if (!newTaskTitle.value.trim()) {
    alert("Digite uma tarefa válida!")
    return
  }

  const data = {
    title: newTaskTitle.value,
    completed: false
  }

  try {
    const response = await axios.post(`/tasks`, data)
    tasks.value.push(response.data)  // Atualiza a lista local
    newTaskTitle.value = ""  // Limpa o campo de entrada
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error)
  }
}

// Observa mudanças nas tasks para atualizar listas pendentes e concluídas
watch(tasks, (newTasks) => {
  pendingTasks.value = newTasks.filter((task) => !task.completed)
  // console.log("Tasks pendentes", pendingTasks.value)
  completedTasks.value = newTasks.filter((task) => task.completed)
  // console.log("Tasks concluidas", completedTasks.value)
}, { deep: true })

// Carrega as tarefas quando o componente for montado
onMounted(() => {
  fetchTasks()
})
</script>

<template>
  <div class="body">
    <h1>Minhas tarefas</h1>
    <div class="board">
      <div class="header">
        <input type="text" placeholder="Digite uma tarefa que deseja fazer" v-model="newTaskTitle" @keyup.enter="addTask">
        <button class="blue" @click="addTask">Adicionar</button>
      </div>
      <div class="main">
        <ul>
          <li v-for="task in tasks" :key="task.id">
            <div v-if="task.completed"><s>{{ task.title }}</s></div>
            <div v-else>{{ task.title }}</div>
            <div>
              <button @click="updateTask(task)" :class="!task.completed ? 'gray' : 'green'">{{ task.completed ? 'Concluido' : 'Pendente' }}</button>
              <button @click="deleteTask(task.id)" class="red">Excluir</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="footer">
        <p>Você tem <b>{{ pendingTasks.length }}</b> {{ pendingTasks.length > 1 ? "tarefas pendentes" : "tarefa pendente" }} e <b>{{ completedTasks.length }}</b> {{ completedTasks.length > 1 ? "concluidas" : "concluida" }}.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .body {
    background-color: #2f9292;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .body h1 {
    margin: 32px 16px;
    color: #fff;
  }
  .board {
    background-color: #FFF;
    width: 600px;
    border-radius: 8px;
    padding: 16px;
    margin: 0 16px 32px;
  }
  .board .header {
    margin-bottom: 16px;
    display: flex;
  }
  .board .header input[type="text"] {
    padding: 8px;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    margin: 0 10px 0 0;
    flex: 1;
  }
  .board .header button {
    padding: 8px;
    border: 0;
    border-radius: 4px;
    background-color: #1698e4;
    color: #FFF;
    cursor: pointer;
  }
  .board .main ul {
    list-style: none;
  }
  .board .main ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f1f1f1;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 2px;
  }
  .board .main button {
    padding: 6px 12px;
    margin-left: 8px;
    border: 0;
    border-radius: 4px;
    background-color: #1698e4;
    color: #FFF;
    cursor: pointer;
  }
  .board .main button:hover {
    opacity: 0.9;
  }
  .board .main button.red {
    background-color: #e23212;
  }
  .board .main button.gray {
    background-color: #666666;
  }
  .board .main button.green {
    background-color: #119b3a;
  }
  .board .footer {
    margin-top: 16px;
  }
</style>