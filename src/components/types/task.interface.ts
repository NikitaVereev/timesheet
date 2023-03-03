export interface ITask {
  id?: number
  title: string
  body: string
  addNewTask?: () => void
}
