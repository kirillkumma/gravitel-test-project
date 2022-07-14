import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'

import { useMeQuery } from 'generated'

export const BaseLayout: FC = () => {
  const client = useApolloClient()
  const { data } = useMeQuery()

  const onLogout = () => {
    localStorage.removeItem('token')
    client.refetchQueries({ include: ['Me'] })
  }

  return (
    <>
      <header className="bg-yellow-300 shadow-sm fixed top-0 left-0 right-0 h-12 flex items-center justify-end px-4 z-20">
        <div className="flex items-center gap-2">
          {data?.me?.username}
          <button type="button" onClick={onLogout}>
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"
              />
            </svg>
          </button>
        </div>
      </header>
      <main className="mt-12 p-4">
        <Outlet />
      </main>
    </>
  )
}
