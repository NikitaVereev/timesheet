<script lang="tsx">
export default {
  name: 'my-menu'
}
</script>

<template>
  <div class="wrapper">
    <div @click.stop class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply absolute w-full h-full inset-0 bg-black bg-opacity-60 flex items-center justify-center;
}
.content {
  @apply w-[600px] h-[400px] rounded-3xl bg-slate-600;
}
</style>
