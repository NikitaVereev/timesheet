<script lang="tsx">
import type { ITask } from '@/components/types/task.interface'
import TaskItem from './TaskItem.vue'
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
  <h1>Список задач</h1>
  <div class="task">
    <TaskItem :task="task" v-for="task in tasks" :key="task.id" />
  </div>
</template>

<style scoped>
h1 {
  @apply text-2xl font-bold pb-1;
}
.task {
  @apply flex flex-wrap gap-6 items-start py-3 my-5;
}
</style>
