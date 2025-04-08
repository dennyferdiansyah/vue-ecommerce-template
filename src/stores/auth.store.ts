import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, getProfile } from '@/services'
import type { User } from '@/types/user'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isAuthenticated = ref<boolean>(false)
    const loading = ref<boolean>(false)

    async function loginUser(email: string, password: string): Promise<void> {
        loading.value = true
        try {
            const response = await login({ email, password })
            const token = response.access_token
            localStorage.setItem('auth_token', token)
            await fetchProfile()
            isAuthenticated.value = true
        } catch (error) {
            console.error('Login failed:', error)
            throw error
        } finally {
            loading.value = false
        }
    }

    async function fetchProfile(): Promise<void> {
        try {
            const profile = await getProfile()
            user.value = profile
        } catch (error) {
            console.error('Failed to fetch profile:', error)
        }
    }

    function logout(): void {
        localStorage.removeItem('auth_token')
        user.value = null
        isAuthenticated.value = false
    }

    async function initializeAuth(): Promise<void> {
        const token = localStorage.getItem('auth_token')
        if (token) {
            await fetchProfile()
            isAuthenticated.value = !!user.value
        }
    }

    return {
        user,
        isAuthenticated,
        loading,
        loginUser,
        logout,
        initializeAuth
    }
}, {
    persist: {
        key: 'auth',
        storage: localStorage,
        debug: true, // optional, logs any hydration errors
        pick: ['user', 'isAuthenticated']
    }
})