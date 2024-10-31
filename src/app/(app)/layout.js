'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/(app)/Loading'
import { usePathname } from 'next/navigation'
import Unauthorized from '@/app/(app)/Unauthorized'

const AppLayout = ({ children }) => {
  const restrictPathsByRole = {
    admin: [],
    seller: [
      '/dashboard',
      '/products',
      '/inventory',
      '/employees',
      '/customers',
    ],
    finance: [],
  }

  const { user } = useAuth({ middleware: 'auth' })

  if (!user) {
    return <Loading />
  }

  if (restrictPathsByRole[user.role_code]?.includes(usePathname())) {
    return <Unauthorized />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation user={user} />

      <main>{children}</main>
    </div>
  )
}

export default AppLayout
