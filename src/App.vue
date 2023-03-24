<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <div>
      <h3>Корпоративный портал учёта рабочего времени</h3>
      <nav>
        <RouterLink to="/">Проекты</RouterLink>
        <RouterLink to="/about">Задачи</RouterLink>
      </nav>
    </div>
  </main>

  <RouterView />
</template>

<style scoped>
h3 {
  @apply text-center font-bold text-2xl;
}
</style>
