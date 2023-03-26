<script setup lang="tsx">
import { ProjectService } from '@/components/services/project.service'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import FormInput from '../../../ui/ApiInput.vue'

const props = defineProps({
  task: { type: Object, required: true },
  taskList: { type: Object, required: true }
})

const filterTask = props.taskList.filter(
  (task: { projectId: string }) => task.projectId === props.task._id
)
const completedProjectTime = filterTask.map((task: { completedTime: number }) => task.completedTime)

let summa = 0

for (let i = 0; i < completedProjectTime.length; i++) {
  summa += completedProjectTime[i]
}

const title = ref(props.task.title)
const body = ref(props.task.body)

const onTitle = (e: { target: { value: string } }) => {
  title.value = e.target.value
}
const onBody = (e: { target: { value: string } }) => {
  body.value = e.target.value
}

const queryClient = useQueryClient()

const { mutate: changeTime, isLoading: loadingCompletedTimeProject } = useMutation({
  mutationFn: (data: any) => ProjectService.changeProjectCompleted(props.task._id, data),
  onSuccess: (data) => {
    queryClient.invalidateQueries()
  }
})

const {
  mutate: change,
  isLoading,
  isError,
  error
} = useMutation({
  mutationFn: (data: any) => ProjectService.changeProject(data),

  onSuccess: (data) => {
    queryClient.invalidateQueries()
    console.log('Ты молодец')
  }
})

const putProjectTask = (task: any) => {
  change({ title: title.value, body: body.value, projectId: props.task._id })
}

const completedProject = !props.task.isActive

const toggleCompleted = (task: any) => {
  change({ isActive: completedProject })
  changeTime({ completedTime: 4 })
}

const { mutate } = useMutation({
  mutationFn: (data: any) => ProjectService.deleteProject(data),

  onSuccess: (data) => {
    queryClient.invalidateQueries()
    console.log('Ты молодец')
  }
})

const removeTask = (task: any) => {
  mutate({ projectId: props.task._id })
  console.log(props.task._id)
}
</script>

<template>
  <div class="task">
    <div class="text-wrapper">
      <h2>{{ summa !== 0 ? `Выполнен за ${summa}  ч.` : null }}</h2>

      <FormInput v-model="title" name="Название проекта" type="text" @input="onTitle" />
      {{ title }}
    </div>
    <div class="text-wrapper">
      <h3>Описание проекта</h3>
      <FormInput v-model="body" name="Описание проекта" type="text" @input="onBody" />
      {{ body }}
    </div>
    <button @click="toggleCompleted" class="progress">
      <span v-if="!task.isActive"></span>
      <img v-else src="@/assets/images/completed.png" alt="{{ props.task.isActive }}" />
    </button>

    {{ task.isActive }}

    <div class="btn-wrapper">
      <my-button><RouterLink :to="`/project/${task._id}`">Показать</RouterLink></my-button>
      <RouterView></RouterView>
      <my-button @click="putProjectTask">Редактировать</my-button>

      <my-button @click="removeTask">Удалить</my-button>
    </div>
  </div>
</template>

<style scoped>
@import './TaskItem.scss';
</style>
