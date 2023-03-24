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
  @apply py-2 px-4  bg-black bg-opacity-40 font-bold outline m-3 rounded-2xl outline-teal-500;
  transition: 0.5s ease;
}
.btn:hover {
  @apply bg-teal-500  outline-white tracking-wide;
}
</style>
