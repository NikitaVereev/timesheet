<script lang="tsx">
import TaskList from '@/components/home/home-list/TaskList.vue'
export default {
  data() {
    return {
      tasks: [
        { id: 1, title: 'Работа на сегодня', body: 'Сделать то, что никогда не делал' },
        { id: 2, title: 'Работа на завтра', body: 'Сделать то, что уже делал' }
      ]
    }
  },
  components: { TaskList }
}
</script>

<template>
  <div class="wrapper">
    <div class="tasks">
      <TaskList :tasks="tasks" />
    </div>
  </div>
</template>

<style scoped>
@import './MyHome.scss';
</style>
