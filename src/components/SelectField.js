import React from 'react'
import { MenuItem, Select } from '@mui/material'
import { useField } from 'react-final-form'
import clsx from 'clsx'

const SelectField = ({ name, label, className, validate, data }) => {
  const {
    input,
    meta: { error, touched },
  } = useField(name, { validate })
  return (
    <div className="grid">
      <label>{label}</label>
      <Select className={clsx('font-bold min-w-25', className)} {...input}>
        <MenuItem value="">Seleccione una opcion</MenuItem>
        {data?.map((item, index) => (
          <MenuItem key={index} value={item?.id}>
            {item?.name}
          </MenuItem>
        ))}
      </Select>
      {touched && error}
    </div>
  )
}

export default SelectField
