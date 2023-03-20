<script lang="ts" setup>
import { PostingService } from '../services/posting.service'
import { useRoute } from 'vue-router'
import FormInput from '@/components/ui/ApiInput.vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'

const description = ref('')
const hours = ref('')

const onDescription = (e: { target: { value: string } }) => {
  description.value = e.target.value
}
const onHours = (e: { target: { value: string } }) => {
  hours.value = e.target.value
}

const Submit = () => {
  console.log(description.value)
}
const queryClient = useQueryClient()
const router = useRoute()

const {
  isLoading,
  mutate: createPost,
  isSuccess
} = useMutation({
  mutationFn: () => PostingService.createPost(router.params.id),
  onSuccess: (data) => {
    queryClient.invalidateQueries
  }
})

function addPost() {
  createPost()
}
</script>

<template>
  <form @submit.prevent="Submit">
    <FormInput v-model="description" name="Описание проводки" type="text" @input="onDescription" />
    <FormInput v-model="hours" name="Время на проводку в часах" type="number" @input="onHours" />
  </form>
  {{ description }}
  {{ hours }}
  <span v-if="isLoading">Adding todo...</span>

  <span v-else-if="isSuccess">Todo added!</span>
  <my-button @click="addPost">Создать проводку</my-button>
  <h2></h2>
</template>
