'use client'

import { useEffect, useState } from 'react'
import { supabase, Profile } from '@/lib/supabase'
import SignIn from '../components/SignIn'
import Dashboards from '../components/Dashboards'

console.log('🚀 PAGE.TSX IS DEFINITELY RUNNING')

export default function Home() {
  console.log('🔍 Page.tsx is running!')
  
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('🔍 useEffect running')
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('🔍 Session:', session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔍 Auth state changed:', event, session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    console.log('🔍 Fetching profile for:', userId)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      console.log('🔍 Profile fetched:', data)
      setProfile(data)
    } catch (error) {
      console.error('❌ Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  console.log('🔍 Current state:', { user: !!user, profile: !!profile, loading })

  if (loading) {
    console.log('🔍 Showing loading screen')
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    console.log('🔍 Showing SignIn component')
    return <SignIn />
  }

  console.log('🔍 Showing Dashboards component')
  return <Dashboards user={user} profile={profile} />
}