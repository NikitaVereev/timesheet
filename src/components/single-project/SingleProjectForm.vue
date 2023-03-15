<script setup lang="ts">
import { ref } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import FormInput from '@/components/ui/ApiInput.vue'

const queryClient = useQueryClient()
</script>

<template>
  <form></form>
</template>
