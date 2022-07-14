import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useMeQuery } from 'generated'

import './index.css'
import { Routes } from './routes'
import { URLs } from './urls'

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
    return null
  }

  return <Routes />
}
