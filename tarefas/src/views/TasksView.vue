<script setup>
import { onMounted } from "vue";
import TasksController from "../controllers/TasksController";

const {
  tasks,
  pendingTasks,
  completedTasks,
  newTaskTitle,
  loadTasks,
  createTask,
  toggleTaskStatus,
  removeTask
} = TasksController();

onMounted(loadTasks);
</script>

<template>
  <div class="body">
    <h1>Minhas tarefas</h1>
    <div class="board">
      <div class="header">
        <input type="text" placeholder="Digite uma tarefa que deseja fazer" v-model="newTaskTitle" @keyup.enter="createTask">
        <button class="blue" @click="createTask">Adicionar</button>
      </div>
      <div class="main">
        <ul>
          <li v-for="task in tasks" :key="task.id">
            <div v-if="task.completed"><s>{{ task.title }}</s></div>
            <div v-else>{{ task.title }}</div>
            <div>
              <button @click="toggleTaskStatus(task)" :class="!task.completed ? 'gray' : 'green'">{{ task.completed ? 'Concluido' : 'Pendente' }}</button>
              <button @click="removeTask(task.id)" class="red">Excluir</button>
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