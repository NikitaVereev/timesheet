<script setup lang="ts">
import { ProjectService } from '../services/project.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import Multiselect from '@vueform/multiselect'
import { ref } from 'vue'
import { TaskService } from '../services/task.service'
import SingleProjectTasks from './SingleProjectTasks.vue'

const { data: tasks, isLoading: loadingTasks }: any = useQuery(
  ['all tasks in single project'],
  () => TaskService.getAllTasksNode()
)
const value = ref([])

const router = useRoute()

const { data, isLoading: loadingData }: any = useQuery(['single project'], () =>
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
const { mutate: changeTaskList } = useMutation({
  mutationFn: (data: any) => ProjectService.changeSingleProjectTasks(router.params.id, data),
  onSuccess: (data) => {
    queryClient.invalidateQueries()
  }
})

const putProjectTask = (task: any) => {
  change({
    title: 'Проверка',
    body: 'проверка "428"',
    projectId: router.params.id
  })
}
const putProjectTaskList = (task: any) => {
  changeTaskList({
    taskIdx: value.value
  })
}
</script>

<template>
  <div>
    <div>
      <div class="pac-man" v-if="loadingData"></div>

      <div v-else>
        <h1>{{ data.title }}</h1>

        <h3>{{ data.body }}</h3>
        <mu-button @click="putProjectTask">Редактировать</mu-button>
      </div>
    </div>
    <div v-if="loadingTasks"></div>
    <div v-else>
      <div v-if="loadingData"></div>
      <Multiselect
        v-else
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

    <my-button @click="putProjectTaskList">Отправить</my-button>
    <div v-if="loadingData"></div>
    <SingleProjectTasks v-else :projectTask="data" />
  </div>
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
</style>
