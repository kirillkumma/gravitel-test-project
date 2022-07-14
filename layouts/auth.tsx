import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const AuthLayout: FC = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Outlet />
    </div>
  )
}
