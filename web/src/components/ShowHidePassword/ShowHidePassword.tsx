import { useState } from 'react'

import { Label, PasswordField, TextField } from '@redwoodjs/forms'

import Icon from '../Icon/Icon'

const ShowHidePassword = ({ label, name, ...rest }) => {
  const [isPasswordShowing, setIsShowPasswordShowing] = useState(false)

  const toggleShowPassword = () => {
    setIsShowPasswordShowing((prevValue) => !prevValue)
  }

  return (
    <div className="relative">
      <Label name={name}>{label}</Label>
      {isPasswordShowing ? (
        <TextField name={name} placeholder=" " {...rest} />
      ) : (
        <PasswordField name={name} placeholder=" " {...rest} />
      )}
      <button className="absolute right-6 top-8" onClick={toggleShowPassword}>
        {isPasswordShowing ? (
          <Icon id="eyeOpened" size={32} />
        ) : (
          <Icon id="eyeClosed" size={32} />
        )}
      </button>
    </div>
  )
}

export default ShowHidePassword
