import React from 'react'
import { Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'

const WhenFieldChanges = ({
  field,
  set,
  to,
  condition = (a, b) => a !== b,
}) => (
  <Field name={set} subscription={{}}>
    {({ input: { onChange } }) => (
      <OnChange name={field}>
        {(value, previous) => {
          if (condition(value, previous)) {
            onChange(to)
          }
        }}
      </OnChange>
    )}
  </Field>
)

export default WhenFieldChanges
