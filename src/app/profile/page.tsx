'use client'

import { useState, useEffect } from 'react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { apiService } from '@/lib/api'
import { User } from '@/types'
import { useAuth } from '@/context/AuthContext'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { user: currentUser, login } = useAuth()
  const [profile, setProfile] = useState<User | null>(null)
  const [editForm, setEditForm] = useState({
    full_name: '',
    bio: ''
  })

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser?.username) return
      
      try {
        const userProfile = await apiService.getUserProfile(currentUser.username)
        setProfile(userProfile)
        setEditForm({
          full_name: userProfile.full_name,
          bio: userProfile.bio || ''
        })
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [currentUser])

  const handleSave = async () => {
    if (!profile?.username) return
    
    setSaving(true)
    setError('')
    setSuccess('')
    
    try {
      const updatedUser = await apiService.updateUserProfile(profile.username, {
        full_name: editForm.full_name,
        bio: editForm.bio
      })
      
      setProfile(updatedUser)
      setIsEditing(false)
      setSuccess('Profile updated successfully!')
      
      // Update user in auth context
      const token = localStorage.getItem('token')
      if (token) {
        login(token, updatedUser)
      }
      
      setTimeout(() => setSuccess(''), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name,
        bio: profile.bio || ''
      })
    }
    setIsEditing(false)
    setError('')
  }

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto p-4 max-w-2xl">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (!profile) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto p-4 max-w-2xl">
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">Profile not found</div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <div className="text-sm text-red-600">{error}</div>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <div className="text-sm text-green-600">{success}</div>
            </div>
          )}
          
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                {getInitials(profile.full_name)}
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <h1 className="text-3xl font-bold text-gray-900">{profile.full_name}</h1>
              <div className={`w-3 h-3 ${profile.is_online ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></div>
            </div>
            <p className="text-gray-600 mt-2">@{profile.username}</p>
            <p className="text-gray-500 text-sm mt-1">{profile.is_online ? 'Online' : 'Offline'}</p>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">Personal Info</h3>
                    {!isEditing && (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Full Name</label>
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={editForm.full_name}
                          onChange={(e) => setEditForm({...editForm, full_name: e.target.value})}
                          className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profile.full_name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Username</label>
                      <p className="text-gray-900">@{profile.username}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900">{profile.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                  {isEditing ? (
                    <textarea 
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      rows={4}
                      placeholder="Tell others about yourself..."
                      className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.bio || "No bio yet"}</p>
                  )}
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Member Since</h3>
                  <p className="text-gray-600">{formatJoinDate(profile.created_at)}</p>
                </div>
              </div>
            </div>
            
            {isEditing && (
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}