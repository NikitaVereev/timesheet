import axios, { type AxiosRequestConfig } from 'axios'

export const TransactionsService = {
  async getAllTransactions(_id: string | string[], tr_id: string | string[]) {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/task/${_id}/transactions/${tr_id}/posts`
      )
      return response.data
    } catch (e) {
      console.error(e)
    }
  },

  async createTransactions(
    _id: string | string[],
    tr_id: string | string[],
    data: AxiosRequestConfig<object> | undefined
  ) {
    try {
      return axios.post(`http://localhost:5000/api/task/${_id}/transactions/${tr_id}/posts`, data)
    } catch (e) {
      console.error(e)
    }
  },
  async deleteTransactions(
    _id: string | string[],
    tr_id: string | string[],
    data: AxiosRequestConfig<string> | undefined
  ) {
    try {
      return axios.delete(`http://localhost:5000/api/task/${_id}/transactions/${tr_id}/posts`, {
        data
      })
    } catch (e) {
      console.error(e)
    }
  },
  async changeTransactions(
    _id: string | string[],
    tr_id: string | string[],
    data: AxiosRequestConfig<boolean> | undefined
  ) {
    try {
      return axios.put(`http://localhost:5000/api/task/${_id}/transactions/${tr_id}/posts`, data)
    } catch (e) {
      console.error(e)
    }
  }
}
