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
  mutate({ title: title.value, body: body.value, isActive: false })
}
</script>

<template>
  <form @submit.prevent="Submit">
    <FormInput v-model="title" name="Название проекта" type="text" @input="onTitle" />
    <FormInput v-model="body" name="Описание проекта" type="text" @input="onBody" />
  </form>
  <div>{{ title }}</div>
  {{ body }}
  <span v-if="isLoading">Adding todo...</span>
  <span v-else-if="isError">An error occurred: {{ error.message }}</span>
  <span v-else-if="isSuccess">Todo added!</span>
  <button @click="addTodo">Create Todo</button>
</template>
