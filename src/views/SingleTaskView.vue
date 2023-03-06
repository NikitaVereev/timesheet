<script lang="tsx">
import axios from 'axios'
import SingleTask from '@/components/single-task/SingleTask.vue'
export default {
  data() {
    return {
      singleTasks: []
    }
  },
  methods: {
    async fetchTasksById(id: number) {
      try {
        const response = await axios.get(
          `https://634bc632d90b984a1e3f3996.mockapi.io/api/?id=${id}`,
          {
            headers: {
              Prefer: `code=200, example=Example ${id}`
            }
          }
        )
        this.singleTasks = response.data
        console.log(this.singleTasks)
      } catch (e) {
        console.error('eee', e)
      }
    }
  },
  mounted() {
    const route = useRoute()
    const router = useRouter()
    const productId = ref()
    const currentProject = ref({})
    productId.value = route.params.id
    this.fetchTasksById(productId.value)
  },

  components: {
    SingleTask
  }
}
import api from '@/api'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <SingleTask :singleTasks="singleTasks" />
  </div>
</template>

<style scoped></style>
