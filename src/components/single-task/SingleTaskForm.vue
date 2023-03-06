<script lang="tsx">
import type { ITask } from '@/components/types/task.interface'

export default {
  data() {
    return {
      task: {
        title: '',
        body: '',
        isActive: false
      } as ITask
    }
  },
  methods: {
    addNewTask() {
      if (this.task.title !== '' && this.task.body !== '') {
        this.task.id = Date.now()
        this.$emit('create', this.task)
        this.task = {
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
    <input v-model="task.title" type="text" placeholder="Название проекта" />
    <input v-model="task.body" type="text" placeholder="Описание проекта" />
    <button @click="addNewTask">Добавить проект</button>
  </form>
</template>
