<script lang="tsx">
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const toggleCompleted = () => {
      // eslint-disable-next-line vue/no-mutating-props
      props.task.isActive = !props.task.isActive
      console.log(props.task.isActive)
    }

    return {
      toggleCompleted
    }
  }
}
</script>

<template>
  <div class="task">
    <div class="text-wrapper">
      <h3>Название проекта</h3>
      <p>{{ task.title }}</p>
    </div>
    <div class="text-wrapper">
      <h3>Описание проекта</h3>
      <p>{{ task.body }}</p>
    </div>
    <button @click="toggleCompleted" class="progress">
      <span v-if="!task.isActive"></span>
      <img v-else src="@/assets/images/completed.png" alt="{{ task.isActive }}" />
    </button>

    {{ task.isActive }}
    <div class="btn-wrapper">
      <RouterLink :to="`/task/${task.id}`">Показать</RouterLink>
      <RouterView></RouterView>
      <button>Редактировать</button>
      <button @click="$emit('remove', task)">Удалить</button>
    </div>
  </div>
</template>

<style scoped>
@import './TaskItem.scss';
</style>
