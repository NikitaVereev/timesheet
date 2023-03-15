<script setup lang="tsx">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { TaskService } from '../services/task.service'
import { ref } from 'vue'
import FormInput from '../ui/ApiInput.vue'

const router = useRoute()
const props = defineProps({ task: { type: Array, required: true } })

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
  mutationFn: (data: any) => TaskService.changeTask(data, router.params.id, props.task.id),

  onSuccess: (data) => {
    queryClient.invalidateQueries()
    console.log('Ты молодец')
  }
})

const putProjectTask = (task: any) => {
  mutate({ title: title.value, body: body.value })
}

const completedTask = props.task.createdAt * 1000
const thisDate = new Date(props.task.completedTask)
const getCurrentDate = thisDate.setDate(thisDate.getDate())

function monthDays(year, month) {
  return month == 2
    ? year % 4 != 0 || (year % 100 == 0 && year % 400 != 0)
      ? 28
      : 29
    : (month < 8 && (month & 1) == 0) || (month > 7 && (month & 1) == 1)
    ? 31
    : 30
}

function dateDiff(date1, date2) {
  var years, months, days, hours, minutes, seconds
  var y1, m1, d1, d2, dd
  years = date2.getUTCFullYear() - (y1 = date1.getUTCFullYear())
  months = date2.getUTCMonth() - (m1 = date1.getUTCMonth())
  days = (d2 = date2.getUTCDate()) - (d1 = date1.getUTCDate())
  hours = date2.getUTCHours() - date1.getUTCHours()
  minutes = date2.getUTCMinutes() - date1.getUTCMinutes()
  seconds = date2.getUTCSeconds() - date1.getUTCSeconds()
  dd = 0
  if (seconds < 0) {
    seconds += 60
    minutes--
  }
  if (minutes < 0) {
    minutes += 60
    hours--
  }
  if (hours < 0) {
    hours += 24
    days--
    dd = 1
  }
  if (days < 0) {
    days = monthDays(y1, m1) - d1 + d2 - dd
    months--
  }
  if (months < 0) {
    months += 12
    years--
  }
  return {
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}
console.log(new Date(completedTask - getCurrentDate))

var d1 = new Date(completedTask)
var d2 = new Date(getCurrentDate)
var diff = dateDiff(d1, d2)
const getMeInformation =
  diff.years +
  ' лет, ' +
  diff.months +
  ' месяцев, ' +
  diff.days +
  ' дней, ' +
  diff.hours +
  ' часов, ' +
  diff.minutes +
  ' минут '
const completedProject = !props.task.isActive

function convert() {
  var date = new Date(props.task.postingAccounting.date),
    mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2)
  return [date.getFullYear(), mnth, day].join('-')
}

const toggleCompleted = (task: any) => {
  mutate({ isActive: completedProject, completedTask: new Date() })
}
</script>

<template>
  <div class="task">
    <button class="progress" @click="toggleCompleted">
      <span v-if="!task.isActive"></span>
      <img v-else src="@/assets/images/completed.png" alt="{{ props.task.isActive }}" />
    </button>

    {{ task.isActive }}
    <p>Задача была создана: {{ new Date(task.createdAt * 1000) }}</p>
    <p>Предположительное время выполнения задачи: {{ props.task.time }} ч.</p>
    <p>Реальное время выполнения: {{ getMeInformation }}</p>

    <h2>Название задачи:</h2>
    <FormInput v-model="title" name="Название проекта" type="text" @input="onTitle" />
    {{ title }}
    <p>Описание задачи</p>
    <FormInput v-model="body" name="Описание проекта" type="text" @input="onBody" />
    {{ body }}

    <div class="show">
      <h1>Проводки</h1>
      <div class="showWrapper">
        <div class="content">
          <h2>Описание проводки: {{ task.postingAccounting.description }}</h2>
          <p>Дата проводки: {{ convert(task) }}</p>
          <my-button>Что?</my-button>
        </div>
      </div>
    </div>
    <my-button @click="putProjectTask">Редактировать</my-button>
    <my-button @click="$emit('remove', task)">Удалить</my-button>
  </div>
</template>

<style scoped>
@import './SingleTask.scss';
</style>
