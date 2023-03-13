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
