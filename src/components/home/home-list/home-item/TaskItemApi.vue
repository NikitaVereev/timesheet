<script setup lang="tsx">
import { ProjectService } from '@/components/services/project.service'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import FormInput from '../../../ui/ApiInput.vue'

const props = defineProps({ task: { type: Object, required: true } })

const title = ref(props.task.title)
const body = ref(props.task.body)

const onTitle = (e: { target: { value: string } }) => {
  title.value = e.target.value
}
const onBody = (e: { target: { value: string } }) => {
  body.value = e.target.value
}

const queryClient = useQueryClient()
const { mutate, isLoading, isError, error } = useMutation({
  mutationFn: (data: any) => ProjectService.changeProject(data, props.task.id),

  onSuccess: (data) => {
    queryClient.invalidateQueries()
    console.log('Ты молодец')
  }
})

const putProjectTask = (task: any) => {
  mutate({ title: title.value, body: body.value })
  console.log(props.task.id, title.value)
}

const toggleCompleted = () => {
  // eslint-disable-next-line vue/no-mutating-props
  props.task.isActive = !props.task.isActive

  console.log(props.task.isActive)
}
</script>

<template>
  <div class="task">
    <div class="text-wrapper">
      <h3>Название проекта</h3>

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
      <my-button><RouterLink :to="`/task/${task.id}`">Показать</RouterLink></my-button>
      <RouterView></RouterView>
      <my-button @click="putProjectTask">Редактировать</my-button>

      <my-button @click="$emit('remove', task)">Удалить</my-button>
    </div>
  </div>
</template>

<style scoped>
@import './TaskItem.scss';
</style>
