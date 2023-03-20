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
  async getProjectById(_id: string | string[]) {
    try {
      const response = await axios.get(`http://localhost:5000/api/task/${_id}`)
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
  async changeCompletedTask(data: any, _id: string | string[]) {
    try {
      return axios.put(`http://localhost:5000/api/task/${_id}`, data)
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
