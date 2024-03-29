import SingleProjectView from '@/views/SingleProjectView.vue'
import SingleTaskView from '@/views/SingleTaskView.vue'

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'task',
      props: true,

      component: HomeView
    },

    {
      path: '/project/:id',
      name: 'singleProject',
      component: SingleProjectView
    },
    {
      path: '/task/:id',
      name: 'singleTask',
      component: SingleTaskView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
