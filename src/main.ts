import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

// 1. 引入样式
import './assets/styles/main.css'
import './assets/styles/map-ui.css'
// 2. 引入 ArcGIS 的样式
import '@arcgis/core/assets/esri/themes/light/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
