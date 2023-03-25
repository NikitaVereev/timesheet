<script setup lang="tsx">
import { TaskService } from '../services/task.service'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import FormInput from '../ui/ApiInput.vue'
import { TransactionsService } from '../services/transaction.service'
import { useRoute } from 'vue-router'
import { PostingService } from '../services/posting.service'
const router = useRoute()

const props = defineProps({
  task: { type: Object, required: true },
  transactionData: { type: Object, required: true }
})
const aaa = props.transactionData.filter((i: { taskId: string }) => i.taskId === props.task._id)
const bbb = aaa.map((i: { completedTime: number }) => i.completedTime)
let summa = 0
for (let i = 0; i < bbb.length; i++) {
  summa += bbb[i]
}
const title = ref(props.task.title)
const body = ref(props.task.body)

const onTitle = (e: { target: { value: string } }) => {
  title.value = e.target.value
}
const onBody = (e: { target: { value: string } }) => {
  body.value = e.target.value
}

console.log(props.task._id)

// const bbbb = transactionData.value.map((i) => i)
// const aaaa = bbbb.filter((i) => i.taskId === props.task.taskId)
// console.log(aaaa)

const queryClient = useQueryClient()
const {
  mutate: change,
  isLoading,
  isError,
  error
} = useMutation({
  mutationFn: (data: any) => TaskService.changeTask(data),

  onSuccess: (data) => {
    queryClient.invalidateQueries()
    console.log('Ты молодец')
  }
})

const putProjectTask = (task: any) => {
  change({ title: title.value, body: body.value, taskId: props.task._id })
  console.log(props.task._id, title.value)
}

const { mutate: changeCompleted } = useMutation({
  mutationFn: (data: any) => TaskService.changeTask(data),

  onSuccess: (data) => {
    queryClient.invalidateQueries()
    console.log('Нет')
  }
})

const toggleCompleted = (task: any) => {
  changeCompleted({
    isActive: !props.task.isActive,
    taskId: props.task._id,
    title: title.value,
    body: body.value
  })
}
const { mutate } = useMutation({
  mutationFn: (data: any) => TaskService.whyYouDontDelete(data),

  onSuccess: (data) => {
    queryClient.invalidateQueries()
  }
})

const removeTask = (task: any) => {
  mutate({ taskId: props.task._id })
}
</script>

<template>
  <div class="task">
    <div class="text-wrapper">
      <h3>Название проекта</h3>
      <h2>Выполнен за {{ summa }} ч.</h2>
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
      <my-button><RouterLink :to="`/task/${task._id}`">Показать</RouterLink></my-button>
      <RouterView></RouterView>
      <my-button @click="putProjectTask">Редактировать</my-button>

      <my-button @click="removeTask">Удалить</my-button>
    </div>
  </div>
</template>

<style scoped>
.task {
  @apply bg-black w-[30%] flex flex-col gap-5 bg-opacity-60 border-2 rounded-3xl p-3 border-solid relative border-[#f7f7];
}
.progress {
  @apply absolute right-4 top-4 w-8 h-8;
}
.progress span {
  @apply w-full h-full top-0 left-0 rounded-full border-2 cursor-pointer border-solid border-[#f7f7] absolute;
}

.text-wrapper:first-child {
  @apply mr-8;
}
.text-wrapper h3 {
  @apply text-xl;
}
.text-wrapper p {
  @apply text-opacity-80 text-white;
}
textarea {
  @apply text-white bg-black;
}
</style>
