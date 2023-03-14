<script setup lang="tsx">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { TaskService } from '../services/task.service'

const router = useRoute()

const queryClient = useQueryClient()

const title = ref('')
const body = ref('')
const time = ref(0)

const onTitle = (e: { target: { value: string } }) => {
  title.value = e.target.value
}
const onBody = (e: { target: { value: string } }) => {
  body.value = e.target.value
}
const onTime = (e: { target: { value: number } }) => {
  time.value = e.target.value
}

const addNewTask = () => {
  console.log(title.value, body.value, time.value)
}

const {
  isLoading,
  isError,
  error,
  isSuccess,
  mutate: postSingleTask
} = useMutation({
  mutationFn: (newTask) => TaskService.postTask(newTask, router.params.id),
  onSuccess: (data) => {
    queryClient.invalidateQueries()
    console.log('Получилось?')
  }
})

function addTodo() {
  if (time.value < 25) {
    postSingleTask({
      title: title.value,
      body: body.value,
      isActive: false,
      time: time.value,
      completedTask: new Date()
    })
  } else {
    console.log('атата, нельзя поставить больше 24 часов!')
  }
}
</script>

<template>
  <form @submit.prevent>
    <my-input v-model="title" type="text" placeholder="Название проекта" />
    <my-input v-model="body" type="text" placeholder="Описание проекта" />
    <my-input v-model="time" type="number" placeholder="Времени на задачу" />
    <my-button @click="addTodo">Добавить проект</my-button>
  </form>
</template>
