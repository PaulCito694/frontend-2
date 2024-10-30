import React from 'react'
import { useField } from 'react-final-form'
import clsx from 'clsx'

const LabelField = ({
  name,
  label,
  parentClassName,
  validate,
  initialValue,
}) => {
  const {
    input,
    meta: { error },
  } = useField(name, { validate, initialValue })

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
      {input.value}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  )
}

export default LabelField
