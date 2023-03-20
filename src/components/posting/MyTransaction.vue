<script setup lang="ts">
import { TransactionsService } from '../services/transaction.service'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'

const router = useRoute()
const queryClient = useQueryClient()

const props = defineProps({
  transaction: { type: Object, required: true },
  transactions: { type: Object, required: true }
})

const { mutate: deleteTransaction } = useMutation({
  mutationFn: (data: any) =>
    TransactionsService.deleteTransactions(router.params.id, props.transaction._id, data),
  onSuccess: (data) => {
    queryClient.invalidateQueries()
  }
})

const removeItem = () => {
  deleteTransaction({ postingId: props.transaction._id })
}

const { mutate: changeCompleted } = useMutation({
  mutationFn: (data: any) =>
    TransactionsService.changeTransactions(router.params.id, props.transaction._id, data),
  onSuccess: (data) => {
    queryClient.invalidateQueries()
  }
})

const toggleCompleted = (task: any) => {
  changeCompleted({
    isActive: !props.transaction.isActive,
    postingId: props.transaction._id
  })
}

const createdPost = new Date(props.transaction.createdAt)
const getCreatedDate = createdPost.setDate(createdPost.getDate())
const updatedPost = new Date(props.transaction.updatedAt)
const getUpdatedDate = updatedPost.setDate(updatedPost.getDate())

function monthDays(year: number, month: number) {
  return month == 2
    ? year % 4 != 0 || (year % 100 == 0 && year % 400 != 0)
      ? 28
      : 29
    : (month < 8 && (month & 1) == 0) || (month > 7 && (month & 1) == 1)
    ? 31
    : 30
}
function dateDiff(date1: Date, date2: Date) {
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
var d1 = new Date(getCreatedDate)
var d2 = new Date(getUpdatedDate)
var diff = dateDiff(d1, d2)
let color = ''

if (diff.hours > 8) {
  color = 'red'
} else if (diff.hours < 8) {
  color = 'yellow'
} else {
  color = 'green'
}
</script>

<template>
  <div
    class="transactionItem"
    :class="{ green: color === 'green', red: color === 'red', yellow: color === 'yellow' }"
    v-if="props.transaction.transactionId === props.transactions._id"
  >
    <div class="transactionHeading">
      <h4>Описание</h4>
      <p>{{ props.transaction.description }}</p>
    </div>
    <div class="time">
      <div>
        <h4>Дата создания</h4>
        <p>{{ props.transaction.createdAt }}</p>
      </div>
      <div>
        <h4>Поставлено времени на выполнение</h4>
        <p class="bigText">{{ props.transaction.hours }} ч.</p>
      </div>
      <div>
        <h4>Потрачено времени</h4>
        <p>{{ diff.hours }}ч. {{ diff.minutes }} м.</p>
      </div>
    </div>
    <div class="btnWrapper">
      <my-button @click="toggleCompleted">{{ props.transaction.isActive }}</my-button>
      <my-button @click="removeItem">Удалить</my-button>
    </div>
  </div>
</template>

<style scoped>
.transactionItem {
  @apply p-5 border border-solid border-teal-500 rounded-3xl w-[31%]  relative bg-black bg-opacity-60;
}
.transactionItem.red {
  @apply bg-red-700 bg-opacity-70;
}
.transactionItem.green {
  @apply bg-green-700 bg-opacity-70;
}
.transactionItem.yellow {
  @apply bg-yellow-700 bg-opacity-70;
}
.btnWrapper {
  @apply flex justify-between items-center py-3;
}
.btnWrapper button {
  @apply w-1/2;
}
.time > div {
  @apply relative border-b border-solid border-teal-500 pb-2 pt-3;
}
h4 {
  @apply text-2xl font-bold text-opacity-70 text-white;
}
p {
  @apply pl-5 text-xl text-white text-opacity-90;
}
.bigText {
  @apply text-4xl font-bold  text-right;
}
</style>
