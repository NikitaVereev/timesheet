<script setup lang="ts">
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import TaskList from '@/components/home/home-list/TaskList.vue'
import type { ITask } from '../types/task.interface'
// import TaskForm from '../home-list/home-form/TaskForm.vue'
import axios from 'axios'
import { ProjectService } from '../services/project.service'
import { TaskService } from '../services/task.service'

const queryClient = useQueryClient()

const { data: tasks, isLoading }: any = useQuery(['all tasks'], () => TaskService.getAllTasksNode())

console.log(tasks)
const { mutate: deleteMutate } = useMutation(
  ['create new project'],
  (data: any) => ProjectService.deleteProject(data),

  {
    onSuccess: (data) => {
      queryClient.invalidateQueries()
    }
  }
)

const removeTask = (data: any) => {
  deleteMutate(data.id)
  console.log(data.id)
}
</script>

<template>
  <div class="wrapper">
    <div class="tasks">
      <!-- <TaskForm /> -->
      <h1>Задачи</h1>
      <div v-if="isLoading" class="pac-man"></div>
      <div v-else><TaskList @remove="removeTask" :tasks="tasks" /></div>
    </div>
  </div>
</template>
