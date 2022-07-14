import { useState, ChangeEventHandler, FormEventHandler } from 'react'
import { useApolloClient } from '@apollo/client'

import { Input, Button } from 'components'
import { useLoginMutation } from 'generated'

const LoginPage = () => {
  const [form, setForm] = useState({ username: '', password: '' })
  const client = useApolloClient()
  const [login, { loading, error }] = useLoginMutation({
    onCompleted(data) {
      if (data.login?.token) {
        localStorage.setItem('token', data.login?.token)
        client.refetchQueries({ include: ['Me'] })
      }
    },
  })

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    login({ variables: form })
  }

  return (
    <form className="max-w-xs grid grid-flow-row gap-6" onSubmit={onSubmit}>
      <div className="grid grid-flow-row gap-8 items-center">
        <h1 className="text-4xl text-center">Вход</h1>
        <p className="text-center">
          Уникальная технология доступная для вашего бизнеса уже сейчас!
        </p>
      </div>
      <div className="grid grid-flow-row gap-4">
        {error && <p className="text-red-500 text-center">{error.message}</p>}
        <Input
          placeholder="Логин"
          name="username"
          onChange={onChange}
          type="text"
          disabled={loading}
          required
        />
        <Input
          placeholder="Пароль"
          name="password"
          onChange={onChange}
          type="password"
          disabled={loading}
          required
        />
        <Button type="submit" disabled={loading}>
          Войти
        </Button>
      </div>
    </form>
  )
}

export default LoginPage
