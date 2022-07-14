import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const AuthLayout: FC = () => {
  return (
    <main className="h-screen flex items-center justify-center p-4">
      <Outlet />
    </main>
  )
}
