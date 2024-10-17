'use client'

import Link from 'next/link'
/*import { useAuth } from '@/hooks/auth'*/

const LoginLinks = () => {
  //const { user } = useAuth({ middleware: 'guest' })

  return (
    <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
      <Link href="/dashboard" className="ml-4 text-sm text-gray-700 underline">
        Dashboard
      </Link>
    </div>
  )
}

export default LoginLinks
