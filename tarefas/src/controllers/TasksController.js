import { ref, watch } from "vue"
import TasksModel from "../models/TasksModel"

export default function TasksController() {
	const tasks = ref([])
	const pendingTasks = ref([])
	const completedTasks = ref([])
	const newTaskTitle = ref("")

	async function loadTasks() {
		try {
			tasks.value = await TasksModel.fetchTasks()
		} catch (error) {
			console.error("Erro ao carregar tarefas:", error)
		}
	}

	async function createTask() {
		if (!newTaskTitle.value.trim()) {
			alert("Digite uma tarefa válida!")
			return
		}

		try {
			const newTask = await TasksModel.addTask(newTaskTitle.value)
			tasks.value.push(newTask)
			newTaskTitle.value = ""
		} catch (error) {
			console.error("Erro ao adicionar tarefa:", error)
		}
	}

	async function toggleTaskStatus(task) {
		try {
			const updatedTask = await TasksModel.updateTask(task)
			task.completed = updatedTask.completed
		} catch (error) {
			console.error("Erro ao atualizar tarefa:", error)
		}
	}

	async function removeTask(taskId) {
		try {
			await TasksModel.deleteTask(taskId)
			tasks.value = tasks.value.filter((task) => task.id !== taskId)
			alert("Tarefa excluída com sucesso!")
		} catch (error) {
			console.error("Erro ao excluir tarefa:", error)
		}
	}

	// Observa mudanças nas tarefas e atualiza listas de pendentes e concluídas
	watch(
		tasks,
		(newTasks) => {
			pendingTasks.value = newTasks.filter((task) => !task.completed)
			completedTasks.value = newTasks.filter((task) => task.completed)
		},
		{ deep: true },
	)

	return {
		tasks,
		pendingTasks,
		completedTasks,
		newTaskTitle,
		loadTasks,
		createTask,
		toggleTaskStatus,
		removeTask,
	}
}
