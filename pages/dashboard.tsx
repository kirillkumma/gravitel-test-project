import { FC, useMemo, useEffect } from 'react'

import { useDashboardQuery } from 'generated'
import { Chart, Spinner } from 'components'

const LABELS: [string, string, string] = [
  'Активные',
  'Неактивные',
  'Завершенные',
]

const DashboardPage: FC = () => {
  const { data, error, startPolling, stopPolling, loading } =
    useDashboardQuery()

  useEffect(() => {
    startPolling(5000)
    return () => stopPolling()
  })

  const scenariosData = useMemo(() => {
    if (data?.dashboard) {
      return [
        data.dashboard.scenarios.active,
        data.dashboard.scenarios.inactive,
        data.dashboard.scenarios.completed,
      ] as [number, number, number]
    }
  }, [data?.dashboard?.scenarios])

  const listsData = useMemo(() => {
    if (data?.dashboard) {
      return [
        data.dashboard.lists.active,
        data.dashboard.lists.inactive,
        data.dashboard.lists.completed,
      ] as [number, number, number]
    }
  }, [data?.dashboard?.lists])

  const dialogsData = useMemo(() => {
    if (data?.dashboard) {
      return [
        data.dashboard.dialogs.active,
        data.dashboard.dialogs.inactive,
        data.dashboard.dialogs.completed,
      ] as [number, number, number]
    }
  }, [data?.dashboard?.dialogs])

  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto grid grid-flow-row gap-8">
      <h1 className="text-4xl">Сводка</h1>
      {error && (
        <p className="text-red-500">
          Произошла ошибка при загрузке данных. Проверьте, что вы имеете
          подключение к интернету, и перезагрузите страницу
        </p>
      )}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-16">
        {scenariosData && (
          <div>
            <Chart data={scenariosData} labels={LABELS} title="Сценарии" />
          </div>
        )}
        {listsData && (
          <div>
            <Chart data={listsData} labels={LABELS} title="Списки" />
          </div>
        )}
        {dialogsData && (
          <div>
            <Chart data={dialogsData} labels={LABELS} title="Диалоги" />
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
