import React from 'react'
import { MenuItem, Select } from '@mui/material'
import { useField } from 'react-final-form'
import clsx from 'clsx'

const SelectField = ({ name, label, className, validate, data, onChange }) => {
  const {
    input,
    meta: { error, touched },
  } = useField(name, { validate })
  return (
    <div className="grid">
      <label>{label}</label>
      <Select
        sx={{
          '& .MuiInputBase-input': {
            padding: '4px',
          },
        }}
        className={clsx('font-bold min-w-25 p-0', className)}
        {...input}
        onChange={e => {
          input.onChange(e.target.value)
          // eslint-disable-next-line no-unused-expressions
          onChange && onChange(e.target.value)
        }}>
        <MenuItem value="">Seleccione una opcion</MenuItem>
        {data?.map((item, index) => (
          <MenuItem key={index} value={item?.id}>
            {item?.name}
          </MenuItem>
        ))}
      </Select>
      {error && touched && <span className="text-red-500">{error}</span>}
    </div>
  )
}

export default SelectField
