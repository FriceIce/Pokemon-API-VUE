import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import pinia from './stores/plugins/persistedStatePlugin'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
