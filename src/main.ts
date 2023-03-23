import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/ui/index'
import router from './router'
import store from '@/store'
import { VueQueryPlugin } from '@tanstack/vue-query'
import './assets/global.scss'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
components.forEach((component) => {
  app.component(component.name, component)
})
app.component('vue-datepicker', VueDatePicker)

app.use(router).use(store).use(VueQueryPlugin).mount('#app')
