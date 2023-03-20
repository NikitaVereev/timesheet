<script setup lang="ts">
import PostItem from './PostItem.vue'
import { useRoute } from 'vue-router'

const router = useRoute()
const props = defineProps({ posts: { type: Object, required: true } })

const newPosts = props.posts.filter((post: any) => post.taskId === router.params.id)
</script>

<template>
  <div v-for="singlePost in newPosts" :key="singlePost._id">
    <PostItem :singlePost="singlePost" />
  </div>
</template>
