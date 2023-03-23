<script lang="ts" setup>
import PostList from './PostList.vue'
import PostForm from './PostForm.vue'
import { TaskService } from '../services/task.service'
import { PostingService } from '../services/posting.service'

import '@vuepic/vue-datepicker/dist/main.css'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'

const router = useRoute()
const queryClient = useQueryClient()

const { data: task, isLoading }: any = useQuery(['single task by id'], () =>
  TaskService.getProjectById(router.params.id)
)
const { data: posts, isLoading: loadingPosts }: any = useQuery(['posting accounting list'], () =>
  PostingService.getAllPosting(router.params.id)
)
queryClient.invalidateQueries({ queryKey: ['filter'] })
</script>

<template>
  <div class="wrapper">
    <div>
      <div v-if="isLoading">Привет)</div>
      <div v-else>
        <div>
          <h1><span>Название</span> {{ task.title }}</h1>
          <h2><span>Описание</span> {{ task.body }}</h2>
        </div>
        <div>
          <h2><span>Время</span> {{ task.time }}</h2>
          <p><span>Задача была создана</span> {{ task.createdAt }}</p>
        </div>
        <div v-if="loadingPosts"></div>
        <PostForm v-else :posts="posts" />
      </div>
    </div>

    <div v-if="loadingPosts">hhhhhhhhhh</div>

    <div v-else>
      <PostList :posts="posts" />
    </div>
  </div>
</template>
