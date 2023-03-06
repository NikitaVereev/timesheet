import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/ui/index'
import router from './router'
import store from '@/store'

import './assets/global.scss'

const app = createApp(App)
components.forEach((component) => {
  app.component(component.name, component)
})

app.use(router)

app.use(store).mount('#app')
