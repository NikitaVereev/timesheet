<script setup lang="ts">
import SingleTaskForm from '@/components/single-task/SingleTaskForm.vue'
import SingleTaskList from '@/components/single-task/SingleTaskList.vue'
import { useRoute } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { TaskService } from '../services/task.service'

const router = useRoute()
console.log(router.params.id)
const queryClient = useQueryClient()

const { data: projectDetails, isLoading: getLoading }: any = useQuery(
  ['all project for tasks'],
  () => TaskService.getProjectById(router.params.id)
)

const { data: taskList }: any = useQuery(['all tasks in project'], () =>
  TaskService.getAllTasks(router.params.id)
)

const { mutate: deleteMutate, isLoading } = useMutation(
  ['delete single task'],
  (data: any) => TaskService.deleteTask(data, router.params.id),
  {
    onSuccess: (data) => {
      queryClient.invalidateQueries()
      console.log('Привет')
    }
  }
)

const removeTask = (data: any) => {
  deleteMutate(data.id)
  console.log(data.id)
}

console.log(projectDetails)
</script>

<template>
  <div class="wrapper">
    <SingleTaskForm />
    {{ projectDetails.title }}
    {{ projectDetails.body }}
    <div v-if="isLoading" class="pac-man"></div>
    <div v-else>
      <SingleTaskList @remove="removeTask" :taskList="taskList" />
    </div>
  </div>
</template>

<style scoped>
@import './SingleTask.scss';
</style>
