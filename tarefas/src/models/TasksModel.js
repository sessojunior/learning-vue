import axios from "../utils/Axios"

export default {
	async fetchTasks() {
		try {
			const response = await axios.get(`/tasks`)
			return response.data
		} catch (error) {
			console.error("Erro ao buscar tarefas:", error)
			throw error
		}
	},

	async addTask(title) {
		try {
			const data = { title, completed: false }
			const response = await axios.post(`/tasks`, data)
			return response.data
		} catch (error) {
			console.error("Erro ao adicionar tarefa:", error)
			throw error
		}
	},

	async updateTask(task) {
		try {
			const updatedTask = { ...task, completed: !task.completed }
			const response = await axios.put(`/tasks/${task.id}`, updatedTask)
			return response.data
		} catch (error) {
			console.error("Erro ao atualizar tarefa:", error)
			throw error
		}
	},

	async deleteTask(taskId) {
		try {
			await axios.delete(`/tasks/${taskId}`)
		} catch (error) {
			console.error("Erro ao excluir tarefa:", error)
			throw error
		}
	},
}
