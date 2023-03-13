<script lang="tsx">
import type { ITask } from '@/components/types/task.interface'
import router from '@/router'

export default {
  data() {
    return {
      project: {
        title: '',
        body: '',
        isActive: false,
        createdTime: 0,
        time: 0
      } as any,
      paramsId: this.$route.params.id
    }
  },

  methods: {
    addNewTask() {
      if (this.project.title !== '' && this.project.body !== '' && this.project.time < 24) {
        this.$emit('create', this.project, this.paramsId)
        console.log(this.paramsId)

        this.project = {
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
    <my-input v-model="project.title" type="text" placeholder="Название проекта" />
    <my-input v-model="project.body" type="text" placeholder="Описание проекта" />
    <my-input v-model="project.time" type="number" placeholder="Времени на задачу" />
    <my-button @click="addNewTask">Добавить проект</my-button>
  </form>
</template>
