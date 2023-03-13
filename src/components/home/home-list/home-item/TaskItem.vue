<script lang="tsx">
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },

  methods: {
    putProjectTask(id: any) {
      this.$emit('put', this.task.id)
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

      <!-- eslint-disable-next-line vue/no-mutating-props -->
      <textarea v-model="task.title" />
    </div>
    <div class="text-wrapper">
      <h3>Описание проекта</h3>
      <!--  eslint-disable-next-line vue/no-mutating-props -->
      <textarea v-model="task.body" />
    </div>
    <button @click="toggleCompleted" class="progress">
      <span v-if="!task.isActive"></span>
      <img v-else src="@/assets/images/completed.png" alt="{{ task.isActive }}" />
    </button>

    {{ task.isActive }}
    <div class="btn-wrapper">
      <my-button><RouterLink :to="`/task/${task.id}`">Показать</RouterLink></my-button>
      <RouterView></RouterView>
      <my-button @click="$emit('put', task)">Редактировать</my-button>

      <my-button @click="$emit('remove', task)">Удалить</my-button>
    </div>
  </div>
</template>

<style scoped>
@import './TaskItem.scss';
</style>
