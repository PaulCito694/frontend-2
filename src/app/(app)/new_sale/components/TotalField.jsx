import { useField, useForm } from 'react-final-form'
import React, { useEffect } from 'react'
import Input from '@/components/Input'
import { isNumber, mix } from '@/utils/validations'

const TotalField = () => {
  let total = 0
  const { input } = useField('sale_details_attributes')
  const { input: receivedMoney } = useField('received_money')
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

  useEffect(() => {
    if (total > 0 && receivedMoney.value > 0) {
      const result = receivedMoney.value - total
      const changeMoney = isNaN(result) ? 0 : Number(result).toFixed(2)

      if (changeMoney > 0) mutators.change('change_money', changeMoney)
      else mutators.change('change_money', 0)
    }
  }, [receivedMoney.value, total])

  return (
    <span className="bg-green-300 p-2 mb-4 flex gap-4">
      <Input name={'total'} value={total} label="Venta en total" disabled />
      <Input
        name={'received_money'}
        label="Dinero recibido"
        validate={mix(isNumber())}
      />
      <Input name={'change_money'} label="Vuelto" disabled />
    </span>
  )
}

export default TotalField
