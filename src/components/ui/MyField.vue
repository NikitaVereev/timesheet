<script lang="ts">
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event: any) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text" />
</template>

<style scoped>
.input {
  @apply bg-black bg-opacity-50 border-2 border-solid border-teal-500;
}
</style>
