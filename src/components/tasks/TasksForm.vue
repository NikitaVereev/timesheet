<script setup lang="ts">
import { TaskService } from '../services/task.service'
import FormInput from '@/components/ui/ApiInput.vue'
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
  mutationFn: (newTodo) => TaskService.createTask(newTodo),
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
    <h1>Создать задачу</h1>
    <FormInput v-model="title" name="Название проекта" type="text" @input="onTitle" />
    <FormInput v-model="body" name="Описание проекта" type="text" @input="onBody" />
  </form>
  <div>{{ title }}</div>
  {{ body }}
  <span v-if="isLoading">Adding todo...</span>

  <span v-else-if="isSuccess">Todo added!</span>
  <button @click="addTodo">Create Todo</button>
</template>
