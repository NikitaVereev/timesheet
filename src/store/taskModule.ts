import type { ITask } from '@/components/types/task.interface'

export const taskModule = {
  state: () => ({
    tasks: [] as ITask[]
  }),
  mutations: {
    setState(state: { tasks: any }, tasks: any) {
      state.tasks = tasks
    }
  },

  namespaced: true
}
