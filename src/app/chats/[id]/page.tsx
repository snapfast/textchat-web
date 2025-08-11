'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { apiService } from '@/lib/api'
import { Chat, Message } from '@/types'
import { useAuth } from '@/context/AuthContext'
import { useWebSocket } from '@/hooks/useWebSocket'

export default function ChatPage() {
  const [chat, setChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()
  const params = useParams()
  const { user: currentUser } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatId = params.id as string
  const { sendMessage: sendWebSocketMessage, isConnected, lastMessage } = useWebSocket(chatId)

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const [chatData, messagesData] = await Promise.all([
          // For now, we'll get chat info from the chats list
          apiService.getChats(),
          apiService.getChatMessages(chatId)
        ])
        
        const currentChat = chatData.find(c => c.id === chatId)
        if (!currentChat) {
          setError('Chat not found')
          return
        }
        
        setChat(currentChat)
        setMessages(messagesData.data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchChatData()
  }, [chatId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (lastMessage) {
      console.log('Received WebSocket message:', lastMessage)
      
      if (lastMessage.type === 'new_message') {
        const newMessage = lastMessage.data as Message
        // Only add message if it's not from current user and not already in messages
        if (newMessage.sender_id !== currentUser?.id && 
            !messages.find(m => m.id === newMessage.id)) {
          setMessages(prev => [...prev, newMessage])
        }
      } else if (lastMessage.type === 'message_deleted') {
        const messageId = lastMessage.data.message_id
        setMessages(prev => prev.filter(m => m.id !== messageId))
      } else if (lastMessage.type === 'message_edited') {
        const editedMessage = lastMessage.data as Message
        setMessages(prev => prev.map(m => 
          m.id === editedMessage.id ? editedMessage : m
        ))
      }
    }
  }, [lastMessage, currentUser, messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || sending) return

    setSending(true)
    const messageContent = newMessage.trim()
    setNewMessage('')

    try {
      const sentMessage = await apiService.sendMessage(chatId, messageContent)
      setMessages(prev => [...prev, sentMessage])
    } catch (err: any) {
      setError(err.message)
      setNewMessage(messageContent) // Restore message if failed
    } finally {
      setSending(false)
    }
  }

  const getOtherParticipant = (chat: Chat) => {
    return chat.participants.find(p => p.id !== currentUser?.id)
  }

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatMessageDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString()
    }
  }

  const shouldShowDateSeparator = (message: Message, index: number) => {
    if (index === 0) return true
    const currentDate = new Date(message.created_at).toDateString()
    const previousDate = new Date(messages[index - 1].created_at).toDateString()
    return currentDate !== previousDate
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </ProtectedRoute>
    )
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-red-600 mb-4">{error}</div>
          <button 
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-700"
          >
            Go Back
          </button>
        </div>
      </ProtectedRoute>
    )
  }

  if (!chat) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center items-center h-screen">
          <div className="text-gray-500">Chat not found</div>
        </div>
      </ProtectedRoute>
    )
  }

  const otherParticipant = getOtherParticipant(chat)

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => router.back()}
                className="text-gray-500 hover:text-gray-700 lg:hidden"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {otherParticipant && (
                <>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {getInitials(otherParticipant.full_name)}
                    </div>
                    {otherParticipant.is_online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900">{otherParticipant.full_name}</h3>
                    <p className="text-sm text-gray-500">
                      {otherParticipant.is_online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message, index) => (
            <div key={message.id}>
              {shouldShowDateSeparator(message, index) && (
                <div className="flex justify-center my-4">
                  <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {formatMessageDate(message.created_at)}
                  </span>
                </div>
              )}
              
              <div className={`flex ${message.sender_id === currentUser?.id ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender_id === currentUser?.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 shadow-sm'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender_id === currentUser?.id ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatMessageTime(message.created_at)}
                    {message.edited && ' (edited)'}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p>No messages yet. Start the conversation!</p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || sending}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  )
}