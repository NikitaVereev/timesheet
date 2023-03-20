<script lang="ts" setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { PostingService } from '../services/posting.service'
import { useRoute } from 'vue-router'
import MyTransactions from './MyTransactions.vue'

const router = useRoute()
const queryClient = useQueryClient()
const props = defineProps({ singlePost: { type: Object, required: true } })

const { mutate: deletePosting } = useMutation({
  mutationFn: (data: any) => PostingService.deletePost(router.params.id, data),
  onSuccess: (data) => {
    queryClient.invalidateQueries()
  }
})

const removePost = (singlePost: any) => {
  deletePosting({ transactionId: props.singlePost._id })
  console.log(props.singlePost._id, router.params.id)
}
</script>

<template>
  <div class="card">
    <div>
      <p>
        Создан<span>{{ new Date(props.singlePost.createdAt).toDateString() }}</span>
      </p>
      <my-button @click="removePost">Удалить</my-button>
    </div>
    <div>
      <MyTransactions :transactions="singlePost" />
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply px-4 py-2 rounded-3xl bg-slate-600 border border-solid border-teal-500 flex flex-col  justify-between relative;
}
.card > div {
  @apply flex items-center gap-3;
}
.card > div > p {
  @apply flex flex-col w-52;
}
.progress {
  @apply absolute right-4 top-4 w-8 h-8;
}
.progress span {
  @apply w-full h-full top-0 left-0 rounded-full border-2 cursor-pointer border-solid border-[#f7f7] absolute;
}
</style>
