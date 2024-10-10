import React from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useField } from 'react-final-form'
import clsx from 'clsx'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'

const DatePickerField = ({
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
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker {...input} value={input.value} format={'DD/MM/YYYY'} />
      </LocalizationProvider>
      {touched && <span className="text-red-500">{error}</span>}
    </div>
  )
}

export default DatePickerField
