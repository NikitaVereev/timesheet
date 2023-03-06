<script lang="tsx">
import type { ITask } from '../types/task.interface'
type IAllTasks = Omit<ITask, 'allTasks'>

export default {
  props: {
    allTasks: {
      type: Array,
      required: true
    } as any
  }
}
</script>

<template>
  <div class="task-info">
    <span>{{ allTasks.id }}</span>
    <h3>{{ allTasks.title }}</h3>
    <p>{{ allTasks.body }}</p>
    {{ allTasks.isActive }}
  </div>
  <div class="btn-wrapper">
    <my-button>Редактировать</my-button>
    <my-button @click="$emit('remove', allTasks)">Удалить</my-button>
  </div>
</template>

<style scoped>
@import './SingleTask.scss';
</style>
