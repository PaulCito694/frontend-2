import React, { useMemo } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useField } from 'react-final-form'
import clsx from 'clsx'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import moment from 'moment'

const DatePickerField = ({
  name,
  label,
  parentClassName,
  validate,
  initialValue,
}) => {
  const currentDate = useMemo(() => moment(), [])

  const {
    input,
    meta: { error, touched },
  } = useField(name, { validate, initialValue: initialValue || currentDate })

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
        <DatePicker {...input} format={'DD/MM/YYYY'} />
      </LocalizationProvider>
      {touched && <span className="text-red-500">{error}</span>}
    </div>
  )
}

export default DatePickerField
