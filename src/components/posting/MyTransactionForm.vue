<script setup lang="ts">
import { TransactionsService } from '../services/transaction.service'
import { useRoute } from 'vue-router'
import FormInput from '@/components/ui/ApiInput.vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref, reactive } from 'vue'

const props = defineProps({
  transactionId: { type: String, required: true },
  transactionData: { type: Object, required: true }
})

const lol = props.transactionData
  .filter((post: { transactionId: string }) => post.transactionId === props.transactionId)
  .map((item: { hours: number }) => item.hours)

var summa = 0
for (let i = 0; i < lol.length; i++) {
  summa += lol[i]
}

const description = ref('')

const state = reactive({ count: 0 })

const increment = () => {
  if (state.count < 24 - summa) {
    state.count++
  } else {
    console.log('gg')
  }
}

const decrement = () => {
  if (state.count > 0) {
    state.count--
  }
}

const onDescription = (e: { target: { value: string } }) => (description.value = e.target.value)

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

function addTransaciton() {
  if (summa < 25) {
    createTransaction({
      description: description.value,
      hours: state.count,
      taskId: router.params.id
    })
    window.location.reload()
  } else {
    console.log('Вы больше не можете вводить задачи, ')
  }
}
</script>

<template>
  <div v-if="summa >= 24"><h1>Вы ввели максимальное время, дождитесь завтра</h1></div>
  <div v-else>
    <form @submit.prevent>
      <FormInput v-model="description" name="Описание задачи" type="text" @input="onDescription" />

      <div>
        <my-button @click="decrement">-</my-button>
        {{ state.count }}
        <my-button @click="increment">+</my-button>
      </div>
    </form>
    {{ description }}

    <span v-if="isLoading">Создание...</span>
    <span v-else-if="isSuccess">Создано!</span>
    <my-button @click="addTransaciton">Создать</my-button>
  </div>
</template>
