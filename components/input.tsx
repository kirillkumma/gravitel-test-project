import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'
import cn from 'classnames'

export const Input: FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        'px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-300 duration-300',
        className
      )}
      {...props}
    />
  )
}
