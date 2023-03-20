import axios, { type AxiosRequestConfig } from 'axios'

export const PostingService = {
  async getAllPosting(_id: string | string[]) {
    try {
      const response = await axios.get(`http://localhost:5000/api/task/${_id}/transactions`)
      return response.data
    } catch (e) {
      console.error(e)
    }
  },
  async createPost(_id: string | string[]) {
    try {
      return axios.post(`http://localhost:5000/api/task/${_id}/transactions`)
    } catch (e) {
      console.error(e)
    }
  },
  async deletePost(_id: string | string[], data: AxiosRequestConfig<string> | undefined) {
    try {
      return axios.delete(`http://localhost:5000/api/task/${_id}/transactions`, { data })
    } catch (e) {
      console.error(e)
    }
  },
  async changePost(_id: string | string[], data: AxiosRequestConfig<boolean> | undefined) {
    try {
      return axios.put(`http://localhost:5000/api/task/${_id}/transactions`, data)
    } catch (e) {
      console.error(e)
    }
  }
}
