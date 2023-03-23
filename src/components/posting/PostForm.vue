<script lang="ts" setup>
import { PostingService } from '../services/posting.service'
import { useRoute } from 'vue-router'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()
const router = useRoute()
const props = defineProps({ posts: { type: Object, required: true } })

const stopPosting = props.posts.map(
  (post: { itsMyDay: string }) =>
    post.itsMyDay !== new Date().toISOString().slice(0, 10) + 'T03:00:00.000Z'
)

const {
  isLoading,
  mutate: createPost,
  isSuccess
} = useMutation({
  mutationFn: (data: any) => PostingService.createPost(router.params.id, data),
  onSuccess: (data) => {
    queryClient.invalidateQueries
  }
})

function addPost() {
  if (stopPosting.length === 0) {
    createPost({ itsMyMonth: new Date().getMonth() })
  } else {
    console.log('Завтра дождись')
  }
}
</script>

<template>
  <span v-if="isLoading">Adding todo...</span>

  <span v-else-if="isSuccess">Todo added!</span>
  <my-button @click="addPost">Создать проводку</my-button>
  <h2></h2>
</template>
