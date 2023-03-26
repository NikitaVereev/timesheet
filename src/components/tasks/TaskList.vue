<script lang="tsx" setup>
import { TransactionsService } from '../services/transaction.service'
import TaskItem from './TaskItem.vue'
import { useQuery } from '@tanstack/vue-query'
import { PostingService } from '../services/posting.service'

const props: any = defineProps({
  tasks: {
    type: Array,
    required: true
  }
})
const { data: transactionData, isLoading: transactionDataLoading }: any = useQuery(
  ['transactions in posting accounting'],
  () =>
    TransactionsService.getAllTransactions('641c8842ce45a7ca148f6a71', '641c88fece45a7ca148f6ab7')
)
const notConnectedTask = props.tasks.filter(
  (task: { projectId: string }) => task.projectId === undefined
)
</script>

<template>
  <h1>Список задач</h1>
  <div class="task">
    <div v-if="transactionDataLoading"></div>
    <div v-else class="onlyFlex">
      <TaskItem
        :task="task"
        v-for="task in notConnectedTask"
        :key="task.id"
        :transactionData="transactionData"
      />
    </div>
  </div>
</template>

<style scoped>
h1 {
  @apply text-2xl font-bold pb-1;
}
.task {
  @apply flex flex-wrap gap-6 items-start py-3 my-5;
}
</style>
