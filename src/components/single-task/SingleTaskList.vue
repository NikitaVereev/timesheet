<script lang="tsx">
import SingleTaskItem from './SingleTaskItem.vue'

export default {
  components: { SingleTaskItem },
  props: { singleTask: { type: Object, required: true } }
}
</script>

<template>
  <div class="task-wrapper">
    <div class="task" v-for="allTasks in singleTask.allTasks" :key="allTasks.id">
      <SingleTaskItem :allTasks="allTasks" @remove="$emit('remove', allTasks)" />
    </div>
  </div>
</template>

<style scoped>
@import './SingleTask.scss';
</style>
