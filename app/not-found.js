'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-medium text-gray-700">Page not found</h2>
        <p className="text-gray-500">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="space-x-4">
          <button 
            onClick={() => router.back()} 
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Go Back
          </button>
          <button 
            onClick={() => router.push('/')} 
            className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  )
}