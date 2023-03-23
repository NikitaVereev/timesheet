<script setup lang="tsx">
import { ProjectService } from '@/components/services/project.service'
import type { ITask } from '@/components/types/task.interface'
import FormInput from '../../../ui/ApiInput.vue'
import router from '@/router'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'

const queryClient = useQueryClient()

const title = ref('')
const body = ref('')

const onTitle = (e: { target: { value: string } }) => {
  title.value = e.target.value
}
const onBody = (e: { target: { value: string } }) => {
  body.value = e.target.value
}
const Submit = () => {
  console.log(title.value)
}

const handleCreate = (data: any) => {
  mutate(data)
  console.log(data)
}
const { isLoading, isError, error, isSuccess, mutate } = useMutation({
  mutationFn: (newTodo) => ProjectService.createProject(newTodo),
  onSuccess: (data) => {
    queryClient.invalidateQueries()
  }
})

function addTodo() {
  //@ts-ignore
  mutate({ title: title.value, body: body.value })
}
</script>

<template>
  <form @submit.prevent="Submit">
    <h1>Создать проект</h1>
    <FormInput v-model="title" name="Название проекта" type="text" @input="onTitle" />
    <h1>{{ title }}</h1>
    <FormInput v-model="body" name="Описание проекта" type="text" @input="onBody" />
    <button @click="addTodo">
      <span v-if="isLoading">Adding todo...</span>
      <span v-else-if="isSuccess">Todo added!</span>Create Todo
    </button>
  </form>

  <!-- {{ body }} -->
</template>
