import { FC, useMemo, useState, useEffect, useRef } from 'react'
import cn from 'classnames'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement } from 'chart.js'

ChartJS.register(ArcElement)

export type ChartProps = {
  data: [number, number, number]
  labels: [string, string, string]
  title: string
}

export const Chart: FC<ChartProps> = (props) => {
  const ref = useRef<ChartJS<'doughnut', [number, number, number], string>>()
  const [activeData, setActiveData] = useState(0)

  const sum = useMemo(() => {
    return props.data.reduce((acc, v) => acc + v, 0)
  }, [props.data])

  useEffect(() => {
    setActiveData(sum)
  }, [sum])

  return (
    <div className="grid grid-flow-row gap-4">
      <div className="relative">
        <Doughnut
          ref={ref}
          options={{
            cutout: '90%',
            layout: { padding: 10 },
            onHover(_, elements, __) {
              if (elements[0]) {
                setActiveData(props.data[elements[0].index])
              } else {
                setActiveData(sum)
              }
            },
          }}
          data={{
            labels: props.labels,
            datasets: [
              {
                data: props.data,
                backgroundColor: ['#9ca3af', '#d1d5db', '#6b7280'],
                hoverBackgroundColor: ['#facc15', '#fde047', '#eab308'],
                hoverBorderWidth: 0,
                hoverOffset: 10,
              },
            ],
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center grid grid-flow-row gap-4">
          <p className="text-2xl">{props.title}</p>
          <p className="text-4xl text-yellow-400">{activeData}</p>
        </div>
      </div>
      <div className="grid grid-flow-row gap-4">
        <div
          className={cn(
            'flex items-center justify-between hover:text-yellow-400 hover:underline duration-300'
          )}
          onMouseEnter={() => {
            ref.current?.setActiveElements(
              props.data.map((_, i) => ({ datasetIndex: 0, index: i }))
            )
            ref.current?.update()
          }}
          onMouseLeave={() => {
            ref.current?.setActiveElements([])
            ref.current?.update()
          }}
        >
          <span>Всего:</span> <span>{sum}</span>
        </div>
        {props.labels.map((l, i) => (
          <div
            className={cn('flex items-center justify-between duration-300', {
              'text-yellow-400 underline': activeData === props.data[i],
            })}
            onMouseEnter={() => {
              setActiveData(props.data[i])
              ref.current?.setActiveElements([{ datasetIndex: 0, index: i }])
              ref.current?.update()
            }}
            onMouseLeave={() => {
              setActiveData(sum)
              ref.current?.setActiveElements([])
              ref.current?.update()
            }}
            key={l}
          >
            <span>{l}:</span> <span>{props.data[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
