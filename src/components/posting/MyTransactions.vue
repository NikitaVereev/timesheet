<script setup lang="ts">
import { TransactionsService } from '../services/transaction.service'
import MyTransaction from './MyTransaction.vue'
import MyTransactionForm from './MyTransactionForm.vue'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'

const router = useRoute()
const props = defineProps({ transactions: { type: Object, required: true } })
const { data: transactionData, isLoading }: any = useQuery(
  ['transactions in posting accounting'],
  () => TransactionsService.getAllTransactions(router.params.id, props.transactions._id)
)
</script>

<template>
  <div class="transaction">
    <h2>Задачи</h2>
    <div v-if="isLoading"></div>
    <MyTransactionForm
      v-else
      :transactionData="transactionData"
      :transactionId="transactions._id"
    />

    <div v-if="isLoading"></div>

    <div v-else class="onlyFlex">
      <MyTransaction
        v-for="transaction in transactionData"
        :key="transaction._id"
        :transaction="transaction"
        :transactions="transactions"
      />
    </div>
  </div>
</template>

<style scoped>
.transaction {
  @apply w-full bg-black  bg-opacity-50 p-4 rounded-3xl border border-solid border-teal-500;
}

.onlyFlex {
  @apply flex gap-6 flex-wrap;
}
</style>
