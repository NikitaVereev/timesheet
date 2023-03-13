<script lang="tsx">
import TaskList from '@/components/home/home-list/TaskList.vue'
import type { ITask } from '../types/task.interface'
import TaskForm from './home-list/home-form/TaskForm.vue'

import axios from 'axios'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      date: new Date(),
      tasks: [] as ITask[]
    }
  },

  computed: {
    ...mapState({
      tasks: (state: any) => state.task.tasks
    })
  },

  components: { TaskList, TaskForm },
  methods: {
    removeTask(task: any) {
      console.log(this.tasks.length)
      this.deleteTasks(task)
    },
    addNewTask(task: any) {
      this.postProjects(task)
    },
    putProjectTask(task: any) {
      this.putProject(task)
    },
    async fetchTasks() {
      try {
        const response = await axios.get('https://634bc632d90b984a1e3f3996.mockapi.io/api')
        this.tasks = response.data
        console.log(this.tasks)
      } catch (e) {
        console.error(e)
      }
    },
    async deleteTasks(task: any) {
      try {
        const response = await axios.delete(
          `https://634bc632d90b984a1e3f3996.mockapi.io/api/${task.id}`,
          {
            headers: {
              Prefer: `code=200, example=Example ${task.id}`
            }
          }
        )
        this.tasks = response.data
        window.location.reload()
        console.log(this.tasks)
      } catch (e) {
        console.error(e)
      }
    },
    async postProjects(task: any) {
      try {
        const response = await axios.post('https://634bc632d90b984a1e3f3996.mockapi.io/api', task)
        this.tasks = response.data
        window.location.reload()
        console.log(response.data)
      } catch (e) {
        console.error(e)
      }
    },
    async putProject(task: any) {
      try {
        const response = await axios.put(
          `https://634bc632d90b984a1e3f3996.mockapi.io/api/${task.id}`,
          task,
          {
            headers: {
              Prefer: `code=200, example=Example ${task.id}`
            }
          }
        )
        this.tasks = response.data
        window.location.reload()
        console.log(this.tasks)
      } catch (e) {
        console.error(e)
      }
    }
  },

  mounted() {
    setInterval(() => {
      this.date = new Date()
    }),
      this.fetchTasks()
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="tasks">
      <h1>Проект</h1>
      <TaskForm @create="addNewTask" />
      <h1>Задачи</h1>

      <TaskList @put="putProjectTask" @remove="removeTask" :tasks="tasks" />
    </div>
  </div>
</template>

<style scoped>
@import './MyHome.scss';
</style>
