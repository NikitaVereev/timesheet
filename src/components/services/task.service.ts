import axios from 'axios'

export const TaskService = {
  async getAllTasksNode() {
    try {
      const response = await axios.get('http://localhost:5000/api/task')
      return response.data
    } catch (e) {
      console.error(e)
    }
  },
  async getProjectById(id: string | string[]) {
    try {
      const response = await axios.get(`https://634bc632d90b984a1e3f3996.mockapi.io/api/${id}`)
      console.log(response.data)
      return response.data
    } catch (e) {
      console.error(e)
    }
  },
  async getAllTasks(id: string | string[]) {
    try {
      const response = await axios.get(
        `https://634bc632d90b984a1e3f3996.mockapi.io/api/${id}/tasks`
      )
      return response.data
    } catch (e) {
      console.error(e)
    }
  },
  async deleteTask(data: any, id: string | string[]) {
    try {
      return axios.delete(`https://634bc632d90b984a1e3f3996.mockapi.io/api/${id}/tasks/${data}`)
    } catch (e) {
      console.error(e)
    }
  },
  async postTask(data: any, id: string | string[]) {
    try {
      return axios.post(`https://634bc632d90b984a1e3f3996.mockapi.io/api/${id}/tasks`, data)
    } catch (e) {
      console.error(e)
    }
  },
  async changeTask(data: any, id: string | string[], taskId: string | string[]) {
    try {
      return axios.put(
        `https://634bc632d90b984a1e3f3996.mockapi.io/api/${id}/tasks/${taskId}`,
        data
      )
    } catch (e) {
      console.error(e)
    }
  }
}
