import React from 'react'
import { TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useField } from 'react-final-form'
import clsx from 'clsx'

const useStyles = makeStyles({
  customInput: {
    padding: '4px !important',
  },
})

const TextFieldField = ({
  name,
  label,
  className,
  parentClassName,
  validate,
  initialValue,
  onChange,
  skipFormat,
  ...props
}) => {
  const classes = useStyles()
  const {
    input,
    meta: { error, touched },
  } = useField(name, {
    validate,
    initialValue: initialValue || '',
    format: value => {
      if (typeof value === 'string' && !skipFormat) {
        return value.toUpperCase()
      }
      return value
    },
    ...props,
  })

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
        className={clsx(
          'border border-solid border-black p-0 bg-white',
          className,
        )}
        InputProps={{
          classes: {
            input: classes.customInput,
          },
        }}
        onChange={onChange && onChange(input.value)}
        {...props}
        {...input}
      />
      {error && touched && <span className="text-red-500">{error}</span>}
    </div>
  )
}

export default TextFieldField
