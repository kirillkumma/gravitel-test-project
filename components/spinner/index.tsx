import { FC, useState, useEffect } from 'react'

import styles from './styles.module.css'

export type SpinnerProps = {
  timeout?: number
}

export const Spinner: FC<SpinnerProps> = ({ timeout = 1000 }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true)
    }, timeout)

    return () => clearTimeout(timeoutId)
  }, [timeout])

  if (!isVisible) {
    return null
  }

  return (
    <div className={styles.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
