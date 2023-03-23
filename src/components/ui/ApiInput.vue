<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  modelValue: string
  name: string
  type: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <label class="px-3" for="name">{{ name }}</label>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="name"
    />
    <br />
  </div>
</template>

<style scoped>
input {
  @apply bg-black bg-opacity-50 border-2 border-solid border-teal-500;
}
</style>
