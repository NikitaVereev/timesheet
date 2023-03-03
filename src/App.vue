<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <h3>Корпоративный портал учёта рабочего времени</h3>
      <nav>
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
h3 {
  @apply text-center font-bold text-2xl;
}
</style>
