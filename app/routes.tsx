import { lazy } from 'react'
import { Routes as _Routes, Route } from 'react-router-dom'

import { AuthLayout } from 'layouts'

import { URLs } from './urls'

const LoginPage = lazy(() => import('pages/login'))

export const Routes = () => {
  return (
    <_Routes>
      <Route element={<AuthLayout />}>
        <Route path={URLs.LOGIN} element={<LoginPage />} />
      </Route>
    </_Routes>
  )
}
