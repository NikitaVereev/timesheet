<script setup lang="ts">
import { TransactionsService } from '../services/transaction.service'
import { useRoute } from 'vue-router'
import FormInput from '@/components/ui/ApiInput.vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'

const props = defineProps({ transactionId: { type: String, required: true } })

const description = ref('')
const hours = ref('')

const onDescription = (e: { target: { value: string } }) => (description.value = e.target.value)

const onHours = (e: { target: { value: string } }) => (hours.value = e.target.value)

const queryClient = useQueryClient()
const router = useRoute()

const {
  isLoading,
  mutate: createTransaction,
  isSuccess
} = useMutation({
  mutationFn: (data: any) =>
    TransactionsService.createTransactions(router.params.id, props.transactionId, data),
  onSuccess: (data) => {
    queryClient.invalidateQueries()
  }
})
console.log(props.transactionId)

function addTransaciton() {
  createTransaction({ description: description.value, hours: hours.value })
}
</script>

<template>
  <form>
    <FormInput v-model="description" name="Описание задачи" type="text" @input="onDescription" />
    <FormInput v-model="hours" name="Время на задачу в часах" type="number" @input="onHours" />
  </form>
  {{ description }}
  {{ hours }}
  <span v-if="isLoading">Создание...</span>
  <span v-else-if="isSuccess">Создано!</span>
  <my-button @click="addTransaciton">Создать</my-button>
</template>
