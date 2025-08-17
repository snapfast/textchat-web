'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const [downloading, setDownloading] = useState(false)
  const router = useRouter()

  const handleDownload = async () => {
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
      const link = document.createElement('a')
      link.href = '/textchat-android.apk'
      link.download = 'textchat-android.apk'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Clean white background with no animated elements */}

      {/* Clean Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-gray-900 font-semibold text-xl">TextChat</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">

          {/* Clean Typography */}
          <div className="space-y-8 mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight">
              TextChat
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 font-normal max-w-3xl mx-auto leading-relaxed">
              Next-generation messaging that adapts to your lifestyle
            </p>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Experience lightning-fast conversations with AI-powered features, end-to-end encryption, 
              and a beautiful interface that feels natural on every device.
            </p>
          </div>

          {/* CTA Section */}
          <div className="mb-20">
            <div className="inline-flex flex-col items-center space-y-4">
              <Button 
                onClick={handleDownload}
                disabled={downloading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg transition-colors"
              >
                <div className="flex items-center">
                  {downloading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Preparing Download...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                      </svg>
                      Download for Android
                    </>
                  )}
                </div>
              </Button>
              <div className="flex items-center space-x-4 text-gray-500 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  v0.1 beta
                </div>
                <div>•</div>
                <div>50MB</div>
                <div>•</div>
                <div>Android 10+</div>
              </div>
            </div>
          </div>

        {/* Feature Cards */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Lightning Fast */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">Messages delivered in milliseconds with our optimized protocol. No delays, no waiting.</p>
            </div>

            {/* Security */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Encrypted</h3>
              <p className="text-gray-600 text-sm">End-to-end encryption protects your privacy</p>
            </div>

            {/* AI Features */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Powered</h3>
              <p className="text-gray-600 text-sm">Smart suggestions and auto-translation</p>
            </div>

            {/* Cross Platform */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Cross-Platform Sync</h3>
                  <p className="text-gray-600">Seamlessly switch between devices without missing a beat</p>
                </div>
              </div>
            </div>

            {/* Voice Messages */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Notes</h3>
              <p className="text-gray-600 text-sm">Crystal clear audio messages</p>
            </div>

            {/* File Sharing */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">File Sharing</h3>
              <p className="text-gray-600 text-sm">Share any file type instantly</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-gray-900 mb-2">1M+</div>
              <div className="text-gray-600 text-sm">Active Users</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
              <div className="text-gray-600 text-sm">Uptime</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-gray-900 mb-2">&lt;50ms</div>
              <div className="text-gray-600 text-sm">Message Delay</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9★</div>
              <div className="text-gray-600 text-sm">App Rating</div>
            </div>
          </div>
        </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="text-gray-900 font-semibold text-xl">TextChat</span>
            </div>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              The future of messaging is here. Join millions who have already upgraded their conversations.
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-3 transition-colors"
              >
                Get Mobile App
              </Button>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200 text-gray-500 text-sm">
              © 2025 TextChat. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}