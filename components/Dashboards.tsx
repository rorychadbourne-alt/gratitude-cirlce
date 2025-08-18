'use client'

import { useEffect, useState } from 'react'
import { supabase, Profile, Circle } from '@/lib/supabase.ts'

interface DashboardProps {
  user: any
  profile: Profile
}

export default function Dashboard({ user, profile }: DashboardProps) {
  const [circles, setCircles] = useState<Circle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserCircles()
  }, [])

  const fetchUserCircles = async () => {
    try {
      const { data, error } = await supabase
        .from('circle_members')
        .select(`
          circles (
            id,
            name,
            description,
            invite_code,
            created_by,
            created_at
          )
        `)
        .eq('user_id', user.id)

      if (error) throw error
      setCircles(data?.map(item => item.circles).filter(Boolean) || [])
    } catch (error) {
      console.error('Error fetching circles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Gratitude Circle</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hello, {profile.full_name}</span>
              <button
                onClick={handleSignOut}
                className="text-gray-500 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {circles.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to Gratitude Circle!</h2>
              <p className="text-gray-600 mb-8">Join or create your first gratitude community to get started.</p>
              <div className="space-x-4">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
                  Create Circle
                </button>
                <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300">
                  Join Circle
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Circles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {circles.map((circle) => (
                  <div key={circle.id} className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{circle.name}</h3>
                    <p className="text-gray-600 mb-4">{circle.description}</p>
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
                      Enter Circle
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}