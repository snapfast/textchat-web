'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const [downloading, setDownloading] = useState(false)
  const router = useRouter()

  const handleDownload = async () => {
    setDownloading(true)
    // Simulate APK download
    setTimeout(() => {
      setDownloading(false)
      // In a real app, this would trigger the actual APK download
      const link = document.createElement('a')
      link.href = '/textchat-android.apk'
      link.download = 'textchat-android.apk'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation Override */}
      <nav className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">TextChat</div>
          <Button 
            onClick={() => router.push('/auth/login')}
            variant="outline"
            className="bg-white/80 backdrop-blur-sm"
          >
            Web App
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* App Icon/Logo */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
              TC
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TextChat
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-gray-700 mb-8 font-light">
            Connect, Chat, Share - Anywhere, Anytime
          </h2>

          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience seamless messaging with our powerful Android app. Real-time conversations, 
            intuitive design, and secure communication - all in your pocket.
          </p>

          {/* Download Button */}
          <div className="mb-16">
            <Button 
              onClick={handleDownload}
              disabled={downloading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-full shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {downloading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Preparing Download...
                </div>
              ) : (
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                  </svg>
                  Download for Android
                </div>
              )}
            </Button>
            <p className="text-sm text-gray-500 mt-4">Version 1.0.0 • 15MB • Android 6.0+</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Real-time Messaging</h3>
            <p className="text-gray-600">Instant message delivery with read receipts and typing indicators</p>
          </div>

          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Secure & Private</h3>
            <p className="text-gray-600">End-to-end encryption ensures your conversations stay private</p>
          </div>

          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">User Friendly</h3>
            <p className="text-gray-600">Intuitive interface designed for seamless communication</p>
          </div>
        </div>

        {/* Screenshots Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-12">See TextChat in Action</h3>
          <div className="flex justify-center space-x-8 overflow-x-auto">
            <div className="w-64 h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-2xl flex items-center justify-center flex-shrink-0">
              <div className="text-gray-500 text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <p>Chat List</p>
              </div>
            </div>
            <div className="w-64 h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl shadow-2xl flex items-center justify-center flex-shrink-0">
              <div className="text-blue-600 text-center">
                <div className="w-16 h-16 bg-blue-300 rounded-full mx-auto mb-4"></div>
                <p>Conversations</p>
              </div>
            </div>
            <div className="w-64 h-96 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl shadow-2xl flex items-center justify-center flex-shrink-0">
              <div className="text-purple-600 text-center">
                <div className="w-16 h-16 bg-purple-300 rounded-full mx-auto mb-4"></div>
                <p>Profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold mb-4">TextChat</div>
          <p className="text-gray-400 mb-6">Connecting people through seamless communication</p>
          <div className="flex justify-center space-x-6">
            <Button 
              onClick={() => router.push('/auth/login')}
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Try Web Version
            </Button>
            <Button 
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Download App
            </Button>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500 text-sm">
            © 2024 TextChat. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}