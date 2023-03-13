import axios from 'axios'

export const ProjectService = {
  async getAllProjects() {
    try {
      const response = await axios.get('https://634bc632d90b984a1e3f3996.mockapi.io/api')
      return response.data
    } catch (e) {
      console.error(e)
    }
  },
  async createProject(data: any) {
    try {
      return axios.post('https://634bc632d90b984a1e3f3996.mockapi.io/api', data)
    } catch (e) {
      console.error(e)
    }
  },
  async deleteProject(id: string) {
    try {
      return axios.delete(`https://634bc632d90b984a1e3f3996.mockapi.io/api/${id}`)
    } catch (e) {
      console.error(e)
    }
  },
  async changeProject(data: any, id: string) {
    try {
      return axios.put(`https://634bc632d90b984a1e3f3996.mockapi.io/api/${id}`, data)
    } catch (e) {
      console.error(e)
    }
  }
}
