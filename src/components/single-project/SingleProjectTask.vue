<script lang="ts" setup>
import { TaskService } from '../services/task.service'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import FormInput from '../ui/ApiInput.vue'
import type router from '@/router'

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
  title.value = e.target.value
}

const queryClient = useQueryClient()

const { mutate: changeCompleted } = useMutation({
  mutationFn: (data: any) => TaskService.changeTask(data),
  onSuccess: (data) => {
    queryClient.invalidateQueries()
    console.log('Да')
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

const { mutate: deleteTask } = useMutation({
  mutationFn: (data: any) => TaskService.whyYouDontDelete(data),
  onSuccess: (data) => {
    queryClient.invalidateQueries()
  }
})

const removeTask = (task: any) => {
  deleteTask({ taskId: props.task._id })
}
</script>

<template>
  <div class="task">
    <span>id: {{ props.task._id }}</span>
    <div>
      <span>Время {{ props.task.time }}</span>
      <h2>{{ summa !== 0 ? `Выполнен за ${summa}  ч.` : null }}</h2>
      <button @click="toggleCompleted" class="progress">
        <span v-if="!task.isActive"></span
        ><img v-else src="@/assets/images/completed.png" alt="{{ props.task.isActive }}" />
      </button>
    </div>
    <h1>Название задачи {{ props.task.title }}</h1>
    <p>Описание задачи {{ props.task.body }}</p>
    <div>
      <p>Дата создания{{ props.task.createdAt }}</p>
      <p>Дата обновления{{ props.task.updatedAt }}</p>
    </div>
    <div class="btn-wrapper">
      <my-button><RouterLink :to="`/task/${task._id}`">Показать</RouterLink></my-button>
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
</style>
