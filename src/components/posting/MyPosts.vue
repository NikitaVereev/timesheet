<script lang="ts" setup>
import PostList from './PostList.vue'
import PostForm from './PostForm.vue'
import { TaskService } from '../services/task.service'
import { PostingService } from '../services/posting.service'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'

const router = useRoute()

const { data: task, isLoading }: any = useQuery(['single task by id'], () =>
  TaskService.getProjectById(router.params.id)
)
const { data: posts, isLoading: loadingPosts }: any = useQuery(['posting accounting list'], () =>
  PostingService.getAllPosting(router.params.id)
)
console.log(posts)
</script>

<template>
  <div>
    <div>
      <div v-if="isLoading">Привет)</div>
      <div v-else>
        <div>
          <h1>{{ task.title }}</h1>
          <h2>{{ task.body }}</h2>
        </div>
        <div>
          <h2>{{ task.time }}</h2>
          <p>{{ task.createdAt }}</p>
          <p>{{ task.updatedAt }}</p>
        </div>
        <PostForm />
      </div>
    </div>

    <div v-if="loadingPosts"></div>
    <div v-else>
      <PostList :posts="posts" />
    </div>
  </div>
</template>
