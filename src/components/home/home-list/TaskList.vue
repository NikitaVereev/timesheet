<script lang="tsx">
import TaskItem from '@/components/home/home-list/home-item/TaskItem.vue'
import type { ITask } from '@/components/types/task.interface'
import TaskItemApi from './home-item/TaskItemApi.vue'
export default {
  props: {
    tasks: {
      type: Array,
      required: true
    } as ITask | any
  },
  components: { TaskItemApi }
}
</script>

<template>
  <h1>Список задач</h1>
  <div class="task">
    <TaskItemApi
      @put="$emit('put', task)"
      @remove="$emit('remove', task)"
      :task="task"
      v-for="task in tasks"
      :key="task.id"
    />
  </div>
</template>

<style scoped>
@import './TaskList.scss';
</style>
