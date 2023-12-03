import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
  EmailField,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import HeaderWithRulers from 'src/components/HeaderWithRulers/HeaderWithRulers'
import ShowHidePassword from 'src/components/ShowHidePassword/ShowHidePassword'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await logIn({
      username: data.email,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <MetaTags title="Login" />

      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <HeaderWithRulers className="mb-8 text-white" heading="LOGIN" />
      <Form onSubmit={onSubmit} className="auth-form">
        <div className="field">
          <Label name="email" errorClassName="error">
            Email
          </Label>
          <EmailField
            name="email"
            errorClassName="error"
            ref={emailRef}
            placeholder=""
            validation={{
              required: {
                value: true,
                message: 'Email is required',
              },
            }}
          />

          <FieldError name="email" className="error-message" />
        </div>

        <div className="field">
          <ShowHidePassword
            label="Password"
            name="password"
            errorClassName="error"
            autoComplete="current-password"
            placeholder=""
            validation={{
              required: {
                value: true,
                message: 'Password is required',
              },
            }}
          />

          <FieldError name="password" className="error-message" />
        </div>

        <Submit>Login</Submit>
      </Form>
      <div className="auth-links">
        <Link to={routes.forgotPassword()}>Forgot Password?</Link> •{' '}
        <Link to={routes.signup()}>Need an account?</Link>
      </div>
    </>
  )
}

export default LoginPage
