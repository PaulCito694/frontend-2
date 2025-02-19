import React from 'react'
import { Switch } from '@mui/material'
import { useField } from 'react-final-form'

const SwitchField = ({ name, label, validate }) => {
  const {
    input,
    meta: { error, touched },
  } = useField(name, { validate })
  return (
    <div className="grid">
      <label>{label}</label>
      <Switch
        {...input}
        onChange={e => {
          input.onChange(e.target.checked)
        }}
        checked={input.value}
      />
      {touched && error}
    </div>
  )
}

export default SwitchField
