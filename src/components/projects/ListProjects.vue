<script setup lang="ts">
import { $api } from '@/api'
import router from '@/router'
import { useMutation, useQuery } from 'vue-query'

const { data, isSuccess } = useQuery(
  'get projects',
  () =>
    $api({
      url: '/workouts'
    }),
  { refetchOnWindowFocus: false }
)

const {
  mutate: createProjectLog,
  isSuccess: isSuccessMutate,
  error
} = useMutation(
  'create new project log',
  ({ workoutId }: any) =>
    $api({
      url: '/workouts/log',
      type: 'POST',
      body: { workoutId }
    }),
  {
    onSuccess(data) {
      router.push(`/workouts/${data._id}`)
    }
  }
)
</script>

<template>
  <div>
    <div v-if="isSuccess">
      <div>
        <div v-for="workout in data" :key="workout.idx">
          <div>
            <h1>{{ workout.name }}</h1>

            <my-button
              aria-label="Создать новый проект"
              @click="() => createProjectLog({ workoutId: workout._id })"
            >
              Посмотреть
            </my-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else><h1>Проекта нет</h1></div>
  </div>
</template>
