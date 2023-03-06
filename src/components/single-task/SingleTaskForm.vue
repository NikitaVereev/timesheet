<script lang="tsx">
import type { ITask } from '@/components/types/task.interface'

export default {
  data() {
    return {
      allTasks: {
        title: '',
        body: '',
        isActive: false
      } as any
    }
  },
  methods: {
    addNewTask() {
      if (this.allTasks.title !== '' && this.allTasks.body !== '') {
        this.allTasks.id = Date.now()
        this.$emit('create', this.allTasks)
        this.allTasks = {
          title: '',
          body: '',
          isActive: false
        }
      } else {
        alert('Заполните все поля')
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent>
    <input v-model="allTasks.title" type="text" placeholder="Название проекта" />
    <input v-model="allTasks.body" type="text" placeholder="Описание проекта" />
    <my-button @click="addNewTask">Добавить проект</my-button>
  </form>
</template>

<style scoped>
@import './SingleTask.scss';
</style>
