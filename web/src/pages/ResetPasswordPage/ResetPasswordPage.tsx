import { useEffect, useRef, useState } from 'react'

import {
  Form,
  Label,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import HeaderWithRulers from 'src/components/HeaderWithRulers/HeaderWithRulers'
import ShowHidePassword from 'src/components/ShowHidePassword/ShowHidePassword'

const ResetPasswordPage = ({ resetToken }: { resetToken: string }) => {
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        toast.error(response.error)
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [resetToken, validateResetToken])

  const passwordRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    passwordRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })

    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Password changed!')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Reset Password" />

      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <HeaderWithRulers className="mb-8 text-white" heading="Reset Password" />
      <Form onSubmit={onSubmit} className="rw-form-wrapper">
        <div className="field">
          <ShowHidePassword
            name="password"
            autoComplete="new-password"
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            disabled={!enabled}
            ref={passwordRef}
            validation={{
              required: {
                value: true,
                message: 'New Password is required',
              },
            }}
            label=" New Password"
          />

          <FieldError name="password" className="rw-field-error" />
        </div>

        <Submit disabled={!enabled}>Submit</Submit>
      </Form>
    </>
  )
}

export default ResetPasswordPage
