<script setup lang="ts">
import { ProjectService } from '../services/project.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import Multiselect from '@vueform/multiselect'
import { ref, toRaw, type Ref } from 'vue'
import { TaskService } from '../services/task.service'
import SingleProjectTasks from './SingleProjectTasks.vue'

const { data: tasks }: any = useQuery(['all tasks in single project'], () =>
  TaskService.getAllTasksNode()
)
const value = ref([])

const router = useRoute()

const { data, isLoading }: any = useQuery(['single project'], () =>
  ProjectService.getSingleProject(router.params.id)
)

const queryClient = useQueryClient()

const { mutate: change } = useMutation({
  mutationFn: (data: any) => ProjectService.changeProject(data),

  onSuccess: (data) => {
    queryClient.invalidateQueries()
    console.log('Ты молодец')
  }
})

const putProjectTask = (task: any) => {
  change({
    title: 'dfdf',
    body: 'dfdf',
    taskIdx: value.value,
    projectId: router.params.id
  })

  console.log(value.value)
}
</script>

<template>
  <div>
    <div>
      <div class="pac-man" v-if="isLoading"></div>
      <h1 v-else>{{ data.title }}</h1>

      <h3>{{ data.body }}</h3>
    </div>
    <div>
      <Multiselect
        v-model="value"
        mode="tags"
        placeholder="Select your characters"
        :options="
        tasks.map((t: any) => ({
          value: t._id,
          label: t.title
        }))
      "
        :searchable="true"
      />
      <RouterLink to="/about">Создать задачу</RouterLink>
    </div>

    <my-button @click="putProjectTask">Отправить</my-button>
  </div>
  <SingleProjectTasks :projectTask="data" />
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.multiselect {
  @apply bg-black;
  width: 50% !important;
}
.multiselect-dropdown,
.multiselect .multiselect-tags-search {
  background: #000 !important;
}
.multiselect-tags-search {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  bottom: 0;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  left: 0;
  outline: none;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
}
</style>
