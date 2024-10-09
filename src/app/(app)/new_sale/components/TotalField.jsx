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
        const subTotal = item.price * item.quantity
        mutators.change(
          `sale_details_attributes[${index}].sub_total`,
          isNaN(subTotal) ? 0 : subTotal.toFixed(2),
        )
      })
    }
    total = isNaN(total) ? 0 : Number(total).toFixed(2)

    mutators.change('total', total)
  }, [total])

  return (
    <span className="bg-green-300 p-2 mb-4">
      Total: {isNaN(total) ? 0 : Number(total).toFixed(2)}
      <Input parentClassName="hidden" name={'total'} value={total} />
    </span>
  )
}

export default TotalField
