import axios from 'axios'

export const ProjectService = {
  async getAllProjects() {
    try {
      const response = await axios.get('http://localhost:5000/api/projects')
      return response.data
    } catch (e) {
      console.error(e)
    }
  },
  async getSingleProject(_id: string | string[]) {
    try {
      const response = await axios.get(`http://localhost:5000/api/projects/${_id}`)
      return response.data
    } catch (e) {
      console.error(e)
    }
  },
  async changeSingleProjectTasks(_id: string | string[], data: any) {
    try {
      return axios.put(`http://localhost:5000/api/projects/${_id}`, data)
    } catch (e) {
      console.error(e)
    }
  },
  async changeProjectCompleted(_id: string | string[], data: any) {
    try {
      return axios.put(`http://localhost:5000/api/projects/${_id}/completed`, data)
    } catch (e) {
      console.error(e)
    }
  },
  async createProject(data: any) {
    try {
      return axios.post('http://localhost:5000/api/projects', data)
    } catch (e) {
      console.error(e)
    }
  },
  async deleteProject(data: string) {
    try {
      return axios.delete(`http://localhost:5000/api/projects`, { data })
    } catch (e) {
      console.error(e)
    }
  },
  async changeProject(data: any) {
    try {
      return axios.put(`http://localhost:5000/api/projects`, data)
    } catch (e) {
      console.error(e)
    }
  }
}
