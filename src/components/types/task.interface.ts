interface ISingleTask {
  id?: number
  title: string
  body: string
  isActive: boolean
}

export interface ITask {
  id?: number
  title: string
  body: string
  isActive: boolean
  allTasks: ISingleTask[]
  addNewTask?: () => void
}
