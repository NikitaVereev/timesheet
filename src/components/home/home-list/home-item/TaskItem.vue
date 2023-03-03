<script lang="tsx">
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="task">
    <div>
      <h3>Название: {{ task.title }}</h3>
      <p>Описание: {{ task.body }}</p>
      <button>Показать</button>
      <button>Удалить</button>
    </div>
  </div>
</template>

<style scoped>
@import './TaskItem.scss';
</style>
