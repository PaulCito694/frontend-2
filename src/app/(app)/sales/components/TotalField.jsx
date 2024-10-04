import { useField } from 'react-final-form'
import React from 'react'

const TotalField = () => {
  let total = 0
  const { input } = useField('sale_details_attributes')
  if (input.value) {
    input.value.map(item => (total += item.price * item.quantity))
  }

  return <span>Total: {total}</span>
}

export default TotalField
