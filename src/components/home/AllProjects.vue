<script setup lang="ts">
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import TaskList from '@/components/home/home-list/TaskList.vue'
import type { ITask } from '../types/task.interface'
import TaskForm from './home-list/home-form/TaskForm.vue'
import axios from 'axios'
import { ProjectService } from '../services/project.service'

const queryClient = useQueryClient()

const { data: tasks, isLoading }: any = useQuery(['all projects'], () =>
  ProjectService.getAllProjects()
)

const { mutate: deleteMutate } = useMutation(
  ['create new project'],
  (data: any) => ProjectService.deleteProject(data),

  {
    onSuccess: (data) => {
      queryClient.invalidateQueries()
    }
  }
)

const { mutate: changeMutate } = useMutation(
  ['change project'],
  (data: any) => ProjectService.changeProject(data, data.id),

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

const putProjectTask = (data: any) => {
  changeMutate(data, data.id)
  console.log(data.id)
}
</script>

<template>
  <div class="wrapper">
    <div class="tasks">
      <h1>Проект</h1>
      <TaskForm />
      <h1>Задачи</h1>

      <TaskList @put="putProjectTask" @remove="removeTask" :tasks="tasks" />
    </div>
  </div>
</template>
