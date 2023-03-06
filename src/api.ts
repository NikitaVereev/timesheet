export default {
  async fetchTasksById(id: number) {
    try {
      const response = await axios.get(
        `https://634bc632d90b984a1e3f3996.mockapi.io/api/?id=${id}`,
        {
          headers: {
            Prefer: `code=200, example=Example ${id}`
          }
        }
      )
      console.log(response.data)
      return response.data
    } catch (e) {
      console.error('eee', e)
    }
  }
}
