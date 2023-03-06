<script lang="tsx">
import { mapActions } from 'vuex'
import SingleTaskForm from '@/components/single-task/SingleTaskForm.vue'
import SingleTaskList from '@/components/single-task/SingleTaskList.vue'
export default {
  props: {
    singleTasks: {
      type: Array,
      required: true
    } as any
  },
  components: {
    SingleTaskForm,
    SingleTaskList
  },
  methods: {
    removeTask(allTasks: any) {
      console.log('ddd', this.singleTasks[0].allTasks.length)
      // eslint-disable-next-line vue/no-mutating-props
      this.singleTasks[0].allTasks = this.singleTasks[0].allTasks.filter(
        (t: any) => t.id !== allTasks.id
      )
    },
    addNewTask(allTasks: any) {
      // eslint-disable-next-line vue/no-mutating-props
      this.singleTasks[0].allTasks.push(allTasks)
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <SingleTaskForm @create="addNewTask" />
    <div class="tasks" v-for="singleTask in singleTasks" :key="singleTask.id">
      <div class="heading">
        <h1>{{ singleTask.title }}</h1>
        <p>{{ singleTask.body }}</p>
      </div>

      <div v-if="singleTasks[0].allTasks.length !== 0">
        <SingleTaskList :singleTask="singleTask" @remove="removeTask" />
      </div>
      <div v-else><h1>В данном проекте нет задач. Добавьте их!</h1></div>
    </div>
  </div>
</template>

<style scoped>
@import './SingleTask.scss';
</style>
