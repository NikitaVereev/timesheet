import type { ITask } from '@/components/types/task.interface'
import axios from 'axios'

export const taskModule = {
  state: () => ({
    tasks: [] as ITask[]
  }),
  mutations: {
    setState(state: { tasks: any }, tasks: any) {
      state.tasks = tasks
    }
  },
  actions: {
    async fetchTasks({ state, commit }: any) {
      try {
        const response = await axios.get('https://634bc632d90b984a1e3f3996.mockapi.io/api')
        commit('setState', response.data)
        console.log(response.data)
      } catch (e) {
        console.error(e)
      }
    }
    // async fetchTasksById({ state, commit }: any) {
    //   try {
    //     const response = await axios.get(`https://634bc632d90b984a1e3f3996.mockapi.io/api/?id=1`, {
    //       headers: {
    //         Prefer: `code=200, example=Example ${id}`
    //       }
    //     })
    //     console.log(response.data)
    //     commit('setState', response.data)
    //   } catch (e) {
    //     console.error(e)
    //   }
    // }
  },
  namespaced: true
}
