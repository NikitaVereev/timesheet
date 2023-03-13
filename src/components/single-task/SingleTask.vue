<script lang="tsx">
import { mapActions } from 'vuex'
import SingleTaskForm from '@/components/single-task/SingleTaskForm.vue'
import SingleTaskList from '@/components/single-task/SingleTaskList.vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import router from '@/router'
export default {
  data() {
    return {
      singleTasks: [] as any,
      taskList: [] as any,
      paramsId: this.$route.params.id,
      data: Date.now()
    }
  },

  components: {
    SingleTaskForm,
    SingleTaskList
  },
  mounted() {
    const route = useRoute()
    const projectId = ref()
    projectId.value = route.params.id
    this.getTasks(projectId.value)
    this.fetchTasksById(projectId.value)
  },
  methods: {
    addNewTask(task: any, paramsId: string) {
      this.postTask(task, paramsId)
    },
    removeTask(task: any) {
      this.deleteTask(task)
    },
    async fetchTasksById(id: number) {
      try {
        const response = await axios.get(`https://634bc632d90b984a1e3f3996.mockapi.io/api/${id}`)
        this.singleTasks = response.data
      } catch (e) {
        console.error('eee', e)
      }
    },

    async getTasks(id: string) {
      try {
        const response = await axios.get(
          `https://634bc632d90b984a1e3f3996.mockapi.io/api/${id}/tasks`
        )
        // eslint-disable-next-line vue/no-mutating-props
        this.taskList = response.data
      } catch (e) {
        console.error(e)
      }
    },
    async postTask(task: any, paramsId: string) {
      try {
        const response = await axios.post(
          `https://634bc632d90b984a1e3f3996.mockapi.io/api/${paramsId}/tasks`,
          task
        )
        this.taskList = response.data

        window.location.reload()
      } catch (e) {
        console.error(e)
      }
    },
    async deleteTask(task: any) {
      try {
        const response = await axios.delete(
          `https://634bc632d90b984a1e3f3996.mockapi.io/api/${this.paramsId}/tasks/${task.id}`
        )
        this.taskList = response.data
        window.location.reload()
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <SingleTaskForm @create="addNewTask" />
    {{ singleTasks.createdAt }}

    <div class="heading">
      <h1>{{ singleTasks.id }}</h1>
      <h1>{{ singleTasks.title }}</h1>
      <p>{{ singleTasks.body }}</p>
      <p>Данный проект был создан: {{ new Date(singleTasks.createdAt) }}</p>
    </div>

    <SingleTaskList @remove="removeTask" :taskList="taskList" />
  </div>
</template>

<style scoped>
@import './SingleTask.scss';
</style>
