import { LoginRequest, RegisterRequest, AuthResponse, User, Chat, Message, PaginatedResponse } from '@/types'
import { AuthManager } from './auth'

const API_BASE = 'https://api.pokee.in/api'

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = AuthManager.getToken()
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: this.getAuthHeaders(),
      ...options
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`)
    }

    return data
  }

  // Authentication
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  }

  async register(userData: RegisterRequest): Promise<{ id: number; username: string }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }

  // Users  
  async getCurrentUser(): Promise<User | null> {
    return AuthManager.getUser()
  }

  async fetchAndSetCurrentUser(token: string): Promise<User | null> {
    try {
      const username = AuthManager.getUsernameFromToken(token)
      if (!username) {
        console.error('No username found in token')
        return null
      }
      
      console.log('Fetching user profile for:', username)
      const user = await this.getUserProfile(username)
      console.log('Fetched user:', user)
      
      // Store auth data using AuthManager
      AuthManager.setAuth(token, user)
      
      return user
    } catch (error) {
      console.error('Failed to fetch and set current user:', error)
      return null
    }
  }

  async getUserProfile(username: string): Promise<User> {
    return this.request<User>(`/users/${username}`)
  }

  async updateUserProfile(username: string, updates: { bio?: string; full_name?: string }): Promise<User> {
    return this.request<User>(`/user/${username}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    })
  }

  async getAllUsers(): Promise<User[]> {
    return this.request<User[]>('/users/')
  }

  async searchUsers(query: string): Promise<User[]> {
    return this.request<User[]>(`/users/search?query=${encodeURIComponent(query)}`)
  }

  // Chats
  async getChats(): Promise<Chat[]> {
    return this.request<Chat[]>('/chats/')
  }

  async createChat(recipientUsername: string): Promise<Chat> {
    return this.request<Chat>('/chats/', {
      method: 'POST',
      body: JSON.stringify({ recipient_username: recipientUsername })
    })
  }

  async getChatMessages(chatId: string, limit = 50, cursor?: string): Promise<PaginatedResponse<Message>> {
    const params = new URLSearchParams({ limit: limit.toString() })
    if (cursor) params.append('cursor', cursor)
    
    return this.request<PaginatedResponse<Message>>(`/chats/${chatId}/messages?${params}`)
  }

  async sendMessage(chatId: string, content: string, messageType: 'text' | 'image' | 'file' = 'text'): Promise<Message> {
    return this.request<Message>(`/chats/${chatId}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        content,
        message_type: messageType
      })
    })
  }

  async editMessage(chatId: string, messageId: string, content: string): Promise<Message> {
    return this.request<Message>(`/chats/${chatId}/messages/${messageId}`, {
      method: 'PATCH',
      body: JSON.stringify({ content })
    })
  }

  async deleteMessage(chatId: string, messageId: string): Promise<void> {
    return this.request(`/chats/${chatId}/messages/${messageId}`, {
      method: 'DELETE'
    })
  }

  // Utility methods
  isAuthenticated(): boolean {
    return AuthManager.isAuthenticated()
  }

  logout(): void {
    AuthManager.clearAuth()
  }
}

export const apiService = new ApiService()