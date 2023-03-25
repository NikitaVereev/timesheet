<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import TaskList from './TaskList.vue'
import TasksForm from './TasksForm.vue'
import { TaskService } from '../services/task.service'

const { data: tasks, isLoading }: any = useQuery(['all tasks'], () => TaskService.getAllTasksNode())
</script>

<template>
  <div class="wrapperInner">
    <div class="tasks">
      <TasksForm />
      <h1>Задачи</h1>
      <div v-if="isLoading" class="pac-man"></div>
      <div v-else><TaskList :tasks="tasks" /></div>
    </div>
  </div>
</template>
