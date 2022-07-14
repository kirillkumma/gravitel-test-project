import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import cn from 'classnames'

export const Button: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ className, ...props }) => {
  return (
    <button
      className={cn(
        'bg-yellow-300 rounded-md py-2 hover:bg-yellow-400 duration-300',
        className
      )}
      {...props}
    />
  )
}
