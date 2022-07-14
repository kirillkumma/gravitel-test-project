import { FC, lazy } from 'react'
import { Routes as _Routes, Route } from 'react-router-dom'

import { AuthLayout, BaseLayout } from 'layouts'

import { URLs } from './urls'

const LoginPage = lazy(() => import('pages/login'))
const DashboardPage = lazy(() => import('pages/dashboard'))

export const Routes: FC = () => {
  return (
    <_Routes>
      <Route element={<AuthLayout />}>
        <Route path={URLs.LOGIN} element={<LoginPage />} />
      </Route>
      <Route element={<BaseLayout />}>
        <Route path={URLs.DASHBOARD} element={<DashboardPage />} />
      </Route>
    </_Routes>
  )
}
