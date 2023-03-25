<script setup lang="ts">
import PostItem from './PostItem.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { assert } from '@vue/compiler-core'
import { computed } from 'vue'

const router = useRoute()

const date = ref('')

const props = defineProps({
  posts: { type: Object, required: true }
  // date: { type: Object, required: true }
})

let newPosts = props.posts.filter((post: any) => post.taskId === router.params.id)

const setDate = (value: Date) => {
  date.value = value.toISOString().slice(0, 10) + 'T03:00:00.000Z'

  const doubleFuck = newPosts.filter(
    (post: any) => post.itsMyDay === new Date(date.value).toISOString()
  )
  return doubleFuck
}

const month = ref('')

const setMonth = (value: any) => {
  month.value = value.month
  console.log(month.value)
}

const toggle = () => {
  date.value = ''
  month.value = ''
}
const filteredItems = computed(() => {
  if (date.value !== '') {
    const add = newPosts.filter((post: any) => post.itsMyDay === new Date(date.value).toISOString())

    return add
  } else if (month.value !== '') {
    const daa = newPosts.filter((post: any) => post.itsMyMonth === month.value)
    console.log(filteredItems.value.length)
    return daa
  } else {
    return newPosts
  }
})
</script>

<template>
  <div class="onlyFlex">
    <button @click="toggle">Показать все</button>

    <VueDatePicker
      class="datePicker"
      id="manual"
      :model-value="date"
      @update:model-value="setDate"
      :enable-time-picker="false"
    />
    <VueDatePicker :model-value="month" @update:model-value="setMonth" month-picker />
  </div>
  <h1 v-if="filteredItems.length === 0">Проводок нет!</h1>
  <div v-for="singlePost in filteredItems" :key="singlePost._id">
    <PostItem :singlePost="singlePost" />
  </div>
</template>

<style scoped>
.datePicker {
  @apply w-1/2;
}
</style>
