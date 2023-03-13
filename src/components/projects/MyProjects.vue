<script setup lang="ts">
import { $api } from '@/api'
import router from '@/router'
import { ref } from 'vue'
import { useQuery, useMutation } from 'vue-query'
import ListProjects from './ListProjects.vue'
import { useState } from '@/hooks/useState'

let exercisesCurrent: any[] = []

let name = ''

const history = router.push('/')

const { data, isSuccess } = useQuery(
  'list tasks',
  () =>
    $api({
      url: '/exercises'
    }),
  { refetchOnWindowFocus: false }
)

const {
  mutate,
  error,
  isSuccess: isSuccessMutate
} = useMutation('create new project in my project', ({ exIdx }: any) =>
  $api({
    url: '/workouts',
    type: 'POST',
    body: { name, exerciseIdx: exIdx }
  })
)

const handleSubmit = (e: any) => {
  e.preventDefault()
  const exIdx = exercisesCurrent.map((ex: any) => ex.name)
  if (name)
    mutate({
      exIdx
    })
  console.log(exIdx)
  console.log(exercisesCurrent)
}
</script>

<template>
  <div>
    <h1>Создание нового проекта</h1>
    <form @submit.prevent="handleSubmit">
      <my-input v-model="name" placeholder="Название" type="text" />
      <RouterLink to="/new-task">Добавить новую задачу</RouterLink>
      <div v-if="data">
        <select v-model="exercisesCurrent">
          <option v-for="ex in data" :key="ex._id">{{ ex.name }}</option>
        </select>
      </div>
      <div v-else>Нету ничего</div>
      <my-button>Создать</my-button>
    </form>
    <ListProjects />
  </div>
</template>
