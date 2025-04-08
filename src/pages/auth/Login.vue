<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <AppButton :loading="authStore.loading" type="submit">Login</AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store.ts'
import { useRouter } from 'vue-router'
import AppButton from '@/components/common/AppButton.vue'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

async function handleLogin() {
  try {
    await authStore.loginUser(email.value, password.value)
    router.push('/')
  } catch (error) {
    alert('Login failed')
  }
}
</script>