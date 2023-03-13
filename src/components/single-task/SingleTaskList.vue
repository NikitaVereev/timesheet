<script lang="tsx">
import SingleTaskItem from './SingleTaskItem.vue'

export default {
  components: { SingleTaskItem },
  props: { taskList: { type: Object, required: true } }
}
</script>

<template>
  <div class="task-wrapper">
    <div v-for="task in taskList" :key="task.id">
      <SingleTaskItem @remove="$emit('remove', task)" :task="task" />
    </div>
  </div>
</template>

<style scoped>
@import './SingleTask.scss';
</style>
