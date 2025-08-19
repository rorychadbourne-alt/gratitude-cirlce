'use client'

import { Profile } from '@/lib/supabase'

interface DashboardProps {
  user: any
  profile: Profile
}

export default function Dashboards({ user, profile }: DashboardProps) {
  return (
    <div style={{
      backgroundColor: 'green', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px'
    }}>
      SIMPLIFIED DASHBOARDS COMPONENT WORKS!
    </div>
  )
}