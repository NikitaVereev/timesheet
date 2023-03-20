<script setup lang="ts">
import SingleProjectTask from './SingleProjectTask.vue'
const props = defineProps({ projectTask: { type: Object, required: true } })
</script>

<template>
  <div v-for="singleProjectTask in props.projectTask.tasks" :key="singleProjectTask._id">
    <SingleProjectTask :task="singleProjectTask" />
  </div>
</template>
