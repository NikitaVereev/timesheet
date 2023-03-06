import { createStore } from 'vuex'
import { taskModule } from './taskModule'

export default createStore({
  modules: {
    task: taskModule
  }
})
