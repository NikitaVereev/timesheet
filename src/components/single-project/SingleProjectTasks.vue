<script setup lang="ts">
import SingleProjectTask from './SingleProjectTask.vue'
import { useQuery } from '@tanstack/vue-query'
import { TransactionsService } from '../services/transaction.service'
const props = defineProps({ projectTask: { type: Object, required: true } })

const { data: transactionData, isLoading: transactionDataLoading }: any = useQuery(
  ['transactions in posting accounting'],
  () =>
    TransactionsService.getAllTransactions('641c8842ce45a7ca148f6a71', '641c88fece45a7ca148f6ab7')
)
</script>

<template>
  <div v-for="singleProjectTask in props.projectTask.tasks" :key="singleProjectTask._id">
    <div v-if="transactionDataLoading"></div>
    <SingleProjectTask v-else :task="singleProjectTask" :transaction-data="transactionData" />
  </div>
</template>
