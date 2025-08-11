'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { UserSearch } from '@/components/UserSearch'
import { apiService } from '@/lib/api'
import { User } from '@/types'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
  const { user: currentUser } = useAuth()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await apiService.getAllUsers()
        // Filter out current user
        const otherUsers = fetchedUsers.filter(user => user.id !== currentUser?.id)
        setUsers(otherUsers)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [currentUser])

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  const getStatusColor = (isOnline?: boolean) => {
    return isOnline ? "bg-green-500" : "bg-gray-500"
  }

  const getLastActiveText = (lastActiveAt?: string, isOnline?: boolean) => {
    if (isOnline) return "Online"
    if (!lastActiveAt) return "Offline"
    
    const lastActive = new Date(lastActiveAt)
    const now = new Date()
    const diff = now.getTime() - lastActive.getTime()
    
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const handleMessage = async (username: string) => {
    try {
      const chat = await apiService.createChat(username)
      router.push(`/chats/${chat.id}`)
    } catch (err: unknown) {
      console.error('Failed to create chat:', err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const handleUserSelect = async (user: User) => {
    await handleMessage(user.username)
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Discover People</h1>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <UserSearch 
            onUserSelect={handleUserSelect} 
            placeholder="Search users to start chatting..."
          />
        </div>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="text-sm text-red-600">{error}</div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {getInitials(user.full_name)}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-5 h-5 ${getStatusColor(user.is_online)} rounded-full border-2 border-white`}></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{user.full_name}</h3>
                  <p className="text-sm text-gray-600">@{user.username}</p>
                  <p className="text-sm text-gray-500">{getLastActiveText(user.last_active_at, user.is_online)}</p>
                  {user.bio && <p className="text-sm text-gray-600 mt-2">{user.bio}</p>}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={() => handleMessage(user.username)}
                  className="flex-1"
                >
                  Message
                </Button>
                <Button 
                  onClick={() => router.push(`/profile/${user.username}`)}
                  variant="outline"
                >
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {users.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No users found</div>
            <p className="text-gray-500">Be the first to join the conversation!</p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}