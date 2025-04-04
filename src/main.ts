import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'
import App from "./App.vue"
import router from './router'
import { useAuthStore } from './stores/auth'
import './assets/styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
pinia.use(piniaPersistedstate)

// Initialize auth
const authStore = useAuthStore()
authStore.initializeAuth().then(() => {
    app.mount('#app')
})