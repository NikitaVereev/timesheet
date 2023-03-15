<script setup lang="ts">
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import TaskList from './TaskList.vue'
import type { ITask } from '../types/task.interface'
import TasksForm from './TasksForm.vue'
import axios from 'axios'
import { ProjectService } from '../services/project.service'
import { TaskService } from '../services/task.service'

const queryClient = useQueryClient()

const { data: tasks, isLoading }: any = useQuery(['all tasks'], () => TaskService.getAllTasksNode())
</script>

<template>
  <div class="wrapper">
    <div class="tasks">
      <TasksForm />
      <h1>Задачи</h1>
      <div v-if="isLoading" class="pac-man"></div>
      <div v-else><TaskList :tasks="tasks" /></div>
    </div>
  </div>
</template>
