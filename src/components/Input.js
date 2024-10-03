import React from 'react'
import { TextField } from '@mui/material'
import { useField } from 'react-final-form'
import clsx from 'clsx'

const TextFieldField = ({
  name,
  label,
  className,
  parentClassName,
  validate,
  ...props
}) => {
  const {
    input,
    meta: { error, touched },
  } = useField(name, { validate })
  return (
    <div className={clsx('grid', parentClassName)}>
      {label && (
        <label
          htmlFor={`${name}-input`}
          id={`${name}-label`}
          className="block font-bold mb-1 min-w-25">
          {label}
        </label>
      )}
      <TextField
        className={clsx('border border-solid border-black', className)}
        {...input}
        {...props}
      />
      {touched && <span className="text-red-500">{error}</span>}
    </div>
  )
}

export default TextFieldField
