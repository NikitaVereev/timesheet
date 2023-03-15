import axios, { type AxiosRequestConfig } from 'axios'

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

  async createTask(data: any) {
    try {
      return axios.post('http://localhost:5000/api/task', data)
    } catch (e) {
      console.error(e)
    }
  },
  async changeTask(data: any) {
    try {
      return axios.put(`http://localhost:5000/api/task`, data)
    } catch (e) {
      console.error(e)
    }
  },
  async whyYouDontDelete(data: string) {
    try {
      return axios.delete(`http://localhost:5000/api/task`, { data })
    } catch (e) {
      console.error(e)
    }
  }
}
