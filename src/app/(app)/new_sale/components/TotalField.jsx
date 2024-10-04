import { useField, useForm } from 'react-final-form'
import React, { useEffect } from 'react'
import Input from '@/components/Input'

const TotalField = () => {
  let total = 0
  const { input } = useField('sale_details_attributes')
  if (input.value) {
    input.value.map(item => (total += item.price * item.quantity))
  }
  const { mutators } = useForm()

  useEffect(() => {
    if (input.value) {
      input.value.map((item, index) => {
        mutators.change(
          `sale_details_attributes[${index}].sub_total`,
          item.price * item.quantity,
        )
      })
    }

    mutators.change('total', total)
  }, [total])

  return (
    <span>
      Total: {total}
      <Input parentClassName="hidden" name={'total'} value={total} />
    </span>
  )
}

export default TotalField
