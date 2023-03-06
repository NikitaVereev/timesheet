<script lang="tsx">
import TaskList from '@/components/home/home-list/TaskList.vue'
import type { ITask } from '../types/task.interface'
import TaskForm from './home-list/home-form/TaskForm.vue'
import formatDateMixin from '@/mixins/formatDateMixin'
import axios from 'axios'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      date: new Date(),
      tasks: [] as ITask[]
    }
  },
  mixins: [formatDateMixin],
  computed: {
    //@ts-ignore
    formattedDate() {
      return this.formatDate(this.date)
    },
    ...mapState({
      tasks: (state: any) => state.task.tasks
    })
  },

  components: { TaskList, TaskForm },
  methods: {
    removeTask(task: any) {
      console.log(this.tasks.length)
      this.tasks = this.tasks.filter((t: any) => t.id !== task.id)
    },
    addNewTask(task: any) {
      this.tasks.push(task)
    },
    async fetchTasks() {
      try {
        const response = await axios.get('https://634bc632d90b984a1e3f3996.mockapi.io/api')
        this.tasks = response.data
        console.log(response.data)
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
      <TaskForm @create="addNewTask" />
      <div>{{ formattedDate }}</div>
      <TaskList @remove="removeTask" :tasks="tasks" />
    </div>
  </div>
</template>

<style scoped>
@import './MyHome.scss';
</style>
