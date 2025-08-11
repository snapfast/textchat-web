'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { apiService } from '@/lib/api'
import { Chat } from '@/types'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'

export default function ChatsPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
  const { user: currentUser } = useAuth()

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const fetchedChats = await apiService.getChats()
        setChats(fetchedChats)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchChats()
  }, [])

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  const getOtherParticipant = (chat: Chat) => {
    return chat.participants.find(p => p.id !== currentUser?.id)
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days === 1) return "Yesterday"
    if (days < 7) return `${days}d ago`
    
    return date.toLocaleDateString()
  }

  const handleChatClick = (chatId: string) => {
    router.push(`/chats/${chatId}`)
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Messages</h1>
          <Button 
            onClick={() => router.push('/')}
          >
            New Chat
          </Button>
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
        
        <div className="bg-white rounded-lg shadow-sm border">
          {chats.map((chat, index) => {
            const otherParticipant = getOtherParticipant(chat)
            if (!otherParticipant) return null
            
            return (
              <div 
                key={chat.id} 
                onClick={() => handleChatClick(chat.id)}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${index !== chats.length - 1 ? 'border-b' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {getInitials(otherParticipant.full_name)}
                      </div>
                      {otherParticipant.is_online && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">{otherParticipant.full_name}</h3>
                        <span className="text-sm text-gray-500 ml-2">
                          {chat.last_message ? formatTimestamp(chat.last_message.created_at) : formatTimestamp(chat.updated_at)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm truncate mt-1">
                        {chat.last_message ? chat.last_message.content : "No messages yet"}
                      </p>
                    </div>
                  </div>
                  
                  {chat.unread_count && chat.unread_count > 0 && (
                    <div className="bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center ml-2">
                      {chat.unread_count}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        
        {chats.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No chats yet</div>
            <p className="text-gray-500">Start a conversation with someone!</p>
            <Button 
              onClick={() => router.push('/')}
              className="mt-4"
            >
              Discover People
            </Button>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}