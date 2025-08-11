'use client'

import { useState, useEffect, useRef } from 'react'
import { apiService } from '@/lib/api'
import { User } from '@/types'
import { useAuth } from '@/context/AuthContext'

interface UserSearchProps {
  onUserSelect: (user: User) => void
  placeholder?: string
}

export function UserSearch({ onUserSelect, placeholder = "Search users..." }: UserSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<User[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user: currentUser } = useAuth()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const searchUsers = async () => {
      if (query.trim().length < 2) {
        setResults([])
        setIsOpen(false)
        return
      }

      setLoading(true)
      try {
        const searchResults = await apiService.searchUsers(query.trim())
        // Filter out current user
        const filteredResults = searchResults.filter(user => user.id !== currentUser?.id)
        setResults(filteredResults)
        setIsOpen(true)
      } catch (error) {
        console.error('Search failed:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchUsers, 300)
    return () => clearTimeout(debounceTimer)
  }, [query, currentUser])

  const handleUserSelect = (user: User) => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    onUserSelect(user)
  }

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.length > 0 ? (
            results.map((user) => (
              <button
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {getInitials(user.full_name)}
                    </div>
                    {user.is_online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{user.full_name}</p>
                    <p className="text-sm text-gray-600 truncate">@{user.username}</p>
                    {user.bio && (
                      <p className="text-xs text-gray-500 truncate mt-1">{user.bio}</p>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">
                    {user.is_online ? 'Online' : 'Offline'}
                  </div>
                </div>
              </button>
            ))
          ) : query.trim().length >= 2 && !loading ? (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              No users found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}