<script setup lang="ts">
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import TaskList from '@/components/home/home-list/TaskList.vue'
import TaskForm from './home-list/home-form/TaskForm.vue'
import { ProjectService } from '../services/project.service'

const { data: tasks, isLoading }: any = useQuery(['all projects'], () =>
  ProjectService.getAllProjects()
)

console.log(tasks)
</script>

<template>
  <div class="wrapperInner">
    <div class="tasks">
      <TaskForm />
      <h1>Проекты</h1>
      <div v-if="isLoading" class="pac-man"></div>
      <div v-else><TaskList :tasks="tasks" /></div>
    </div>
  </div>
</template>
