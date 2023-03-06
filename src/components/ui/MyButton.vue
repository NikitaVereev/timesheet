<script lang="tsx">
export default {
  name: 'my-button'
}
</script>

<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style>
.btn {
  @apply py-2 px-4 border-2 border-solid border-teal-500;
  transition: 0.5s ease;
}
.btn:hover {
  @apply bg-teal-500 text-black;
}
</style>
