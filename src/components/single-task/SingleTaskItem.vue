<script lang="tsx">
import type { ITask } from '../types/task.interface'
type IAllTasks = Omit<ITask, 'allTasks'>

export default {
  props: {
    task: {
      type: Array,
      required: true
    } as any
  },
  mounted() {
    let timestamp = { seconds: this.task.createdAt, nanoseconds: 0 }
    let myDate = new Date(timestamp.seconds * 1000)
    console.log(myDate)
  }
}
</script>

<template>
  <div class="task">
    <p>Задача была создана: {{ new Date(task.createdAt * 1000) }}</p>

    <h2>Название задачи: {{ task.title }}</h2>
    <p>Описание задачи {{ task.body }}</p>
    <my-button @click="$emit('remove', task)">Удалить</my-button>
  </div>
</template>

<style scoped>
@import './SingleTask.scss';
</style>
