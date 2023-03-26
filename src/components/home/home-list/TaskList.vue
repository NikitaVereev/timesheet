<script lang="tsx" setup>
import type { ITask } from '@/components/types/task.interface'
import TaskItem from './home-item/TaskItem.vue'
import { useQuery } from '@tanstack/vue-query'
import { TaskService } from '@/components/services/task.service'

const props: any = defineProps({ tasks: { type: Array, required: true } })

const { data, isLoading } = useQuery(['task list'], () => TaskService.getAllTasksNode())
</script>

<template>
  <h1>Список проектов</h1>
  <div v-if="isLoading"></div>
  <div class="task" v-else>
    <TaskItem :task="task" :taskList="data" v-for="task in props.tasks" :key="task.id" />
  </div>
</template>

<style scoped>
@import './TaskList.scss';
</style>
