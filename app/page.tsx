'use client'

import { useEffect, useState } from 'react'

// Let's first test if the basic imports work
console.log('🔍 Starting page.tsx...')

// Try importing one component at a time
// import SignIn from '../components/SignIn'
// import Dashboards from '../components/Dashboards'

export default function Home() {
  console.log('🔍 Page.tsx component is rendering!')
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('🔍 useEffect running')
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          ✅ Basic React is Working!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Now we&apos;ll add back your components one by one...
        </p>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Check the browser console for debug messages</p>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm">Next step: Test Supabase import</p>
          </div>
        </div>
      </div>
    </div>
  )
}