'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'
import SwitchField from '@/components/SwitchField'
import { Form } from 'react-final-form'

const Login = () => {
  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/new_sale',
  })

  return (
    <>
      <AuthSessionStatus className="mb-4" status={'ayes'} />
      <Form
        onSubmit={login}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {/* Email Address */}
            <div>
              <Label htmlFor="email">Email</Label>

              <Input
                name="user.email"
                type="email"
                className="block mt-1 w-full"
                required
                autoFocus
                skipFormat
              />

              {/*<InputError messages={errors.email} className="mt-2" />*/}
            </div>

            {/* Password */}
            <div className="mt-4">
              <Label htmlFor="password">Password</Label>

              <Input
                name="user.password"
                type="password"
                className="block mt-1 w-full"
                required
                autoComplete="current-password"
                skipFormat
              />

              {/*<InputError messages={errors.password} className="mt-2" />*/}
            </div>

            {/* Remember Me */}
            <div className="block mt-4">
              <label htmlFor="remember_me" className="inline-flex items-center">
                <SwitchField
                  name="user.remember"
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />

                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
            </div>

            <div className="flex items-center justify-end mt-4">
              <Link
                href="/forgot-password"
                className="underline text-sm text-gray-600 hover:text-gray-900">
                Forgot your password?
              </Link>

              <Button type="submit" className="ml-3">
                Login
              </Button>
            </div>
          </form>
        )}
      />
    </>
  )
}

export default Login
