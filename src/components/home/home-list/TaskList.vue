<script lang="tsx">
import type { ITask } from '@/components/types/task.interface'
import TaskItem from './home-item/TaskItem.vue'
export default {
  props: {
    tasks: {
      type: Array,
      required: true
    } as ITask | any
  },
  components: { TaskItem }
}
</script>

<template>
  <h1>Список проектов</h1>
  <div class="task">
    <TaskItem :task="task" v-for="task in tasks" :key="task.id" />
  </div>
</template>

<style scoped>
@import './TaskList.scss';
</style>
