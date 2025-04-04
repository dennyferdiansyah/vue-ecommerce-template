import { apiClient } from './client'
import type { User } from '@/types/user'

interface LoginCredentials {
    email: string
    password: string
}

interface LoginResponse {
    access_token: string
    refresh_token?: string
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
    return response.data
}

export const getProfile = async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/profile')
    return response.data
}