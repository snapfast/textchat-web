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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Glassmorphism Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="container mx-auto">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 flex justify-center items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-white font-bold text-xl">TextChat</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Modern Layout */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="text-center max-w-6xl mx-auto">

          {/* Modern Typography */}
          <div className="space-y-6 mb-16">
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                TextChat
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed">
              Next-generation messaging that adapts to your lifestyle
            </p>

            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
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
                className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl border border-white/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative flex items-center">
                  {downloading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Preparing Download...
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                      </svg>
                      Download for Android
                    </>
                  )}
                </div>
              </Button>
              <div className="flex items-center space-x-4 text-white/60 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  v0.1 beta
                </div>
                <div>•</div>
                <div>50MB</div>
                <div>•</div>
                <div>Android 10+</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
          {/* Large Feature Card */}
          <div className="md:col-span-2 lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-bl-3xl"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-white/70 leading-relaxed">Messages delivered in milliseconds with our optimized protocol. No delays, no waiting.</p>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Encrypted</h3>
            <p className="text-white/60 text-sm">End-to-end encryption protects your privacy</p>
          </div>

          {/* AI Features Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Powered</h3>
            <p className="text-white/60 text-sm">Smart suggestions and auto-translation</p>
          </div>

          {/* Cross Platform */}
          <div className="md:col-span-2 lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Cross-Platform Sync</h3>
                <p className="text-white/60">Seamlessly switch between devices without missing a beat</p>
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Voice Messages */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Voice Notes</h3>
            <p className="text-white/60 text-sm">Crystal clear audio messages</p>
          </div>

          {/* File Sharing */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">File Sharing</h3>
            <p className="text-white/60 text-sm">Share any file type instantly</p>
          </div>
        </div>

        {/* Modern Stats Section */}
        <div className="text-center mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">1M+</div>
              <div className="text-white/60 text-sm">Active Users</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">99.9%</div>
              <div className="text-white/60 text-sm">Uptime</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">&lt;50ms</div>
              <div className="text-white/60 text-sm">Message Delay</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">4.9★</div>
              <div className="text-white/60 text-sm">App Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Footer */}
      <footer className="relative z-10 bg-black/50 backdrop-blur-xl border-t border-white/10">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="text-white font-bold text-xl">TextChat</span>
            </div>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              The future of messaging is here. Join millions who have already upgraded their conversations.
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={handleDownload}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl px-8 py-3"
              >
                Get Mobile App
              </Button>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 text-white/40 text-sm">
              © 2025 TextChat. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}