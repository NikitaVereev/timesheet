<script lang="tsx">
import { mapActions } from 'vuex'
import SingleTaskForm from '@/components/single-task/SingleTaskForm.vue'
import SingleTaskList from '@/components/single-task/SingleTaskList.vue'
export default {
  props: {
    singleTasks: {
      type: Array,
      required: true
    }
  },
  components: {
    SingleTaskForm,
    SingleTaskList
  },
  methods: {
    removeTask(allTasks: any) {
      console.log('ddd', this.singleTasks)
    },
    addNewTask(allTasks: any) {
      this.singleTasks.push()
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="tasks" v-for="singleTask in singleTasks" :key="singleTask.id">
      <div class="heading">
        <h1>{{ singleTask.title }}</h1>
        <p>{{ singleTask.body }}</p>
      </div>
      <SingleTaskForm @create="addNewTask" />

      <SingleTaskList :singleTask="singleTask" @remove="removeTask" />
    </div>
  </div>
</template>

<style scoped>
@import './SingleTask.scss';
</style>
