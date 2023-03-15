<script setup lang="ts">
import { ProjectService } from '../services/project.service'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import Multiselect from '@vueform/multiselect'
import { ref, type Ref } from 'vue'
import { TaskService } from '../services/task.service'

const { data: tasks }: any = useQuery(['tasks list'], () => TaskService.getAllTasksNode())

const value: Ref<never[]> = ref([])
const options = tasks

console.log(tasks)

const open = () => {
  console.log(value.value)
}

const router = useRoute()

const { data, isLoading }: any = useQuery(['single project'], () =>
  ProjectService.getSingleProject(router.params.id)
)
</script>

<template>
  <div>
    Привет!)
    <div>
      <h1>{{ data.title }}</h1>
      <h3>{{ data.body }}</h3>
      {{ tasks }}
    </div>
    <Multiselect
      v-model="value"
      mode="tags"
      placeholder="Select your characters"
      :options="options"
      :searchable="true"
      :createTag="true"
    />
    <my-button @click="open">Отправить</my-button>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.multiselect {
  @apply bg-black;
}
.multiselect-dropdown {
  @apply bg-black;
}
</style>
