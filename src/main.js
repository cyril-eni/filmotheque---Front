import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// on utilise les paramètres du router définis dans router/index.js
app.use(router)

app.mount('#app')
