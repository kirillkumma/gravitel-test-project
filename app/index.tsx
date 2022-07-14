import { FC, useEffect, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'

import { useMeQuery } from 'generated'
import { Spinner } from 'components'

import './index.css'
import { Routes } from './routes'
import { URLs } from './urls'

const loadingScreen = (
  <div className="h-screen flex items-center justify-center">
    <Spinner />
  </div>
)

export const App: FC = () => {
  const { data, error, loading } = useMeQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      navigate(URLs.LOGIN)
    } else if (data?.me?.username) {
      navigate(URLs.DASHBOARD)
    }
  }, [data, error])

  if (loading) {
    return loadingScreen
  }

  return (
    <Suspense fallback={loadingScreen}>
      <Routes />
    </Suspense>
  )
}
