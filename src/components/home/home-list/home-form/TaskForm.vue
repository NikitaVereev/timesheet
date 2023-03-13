<script lang="tsx">
import type { ITask } from '@/components/types/task.interface'
import router from '@/router'

export default {
  data() {
    return {
      project: {
        title: '',
        body: '',
        isActive: false
      } as ITask
    }
  },
  methods: {
    addNewTask() {
      if (this.project.title !== '' && this.project.body !== '') {
        this.$emit('create', this.project)
        this.project = {
          title: '',
          body: '',
          isActive: false
        }
        // router.push(`/task/${this.project.id}`)
      } else {
        alert('Заполните все поля')
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent>
    <my-input v-model="project.title" type="text" placeholder="Название проекта" />
    <my-input v-model="project.body" type="text" placeholder="Описание проекта" />
    <my-button @click="addNewTask">Добавить проект</my-button>
  </form>
</template>
