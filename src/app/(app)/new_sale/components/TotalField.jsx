import { useField, useForm } from 'react-final-form'
import React, { useEffect } from 'react'
import Input from '@/components/Input'
import { isNumber, mix, required } from '@/utils/validations'
import SelectField from '@/components/SelectField'
import Button from '@/components/Button'

const TotalField = ({ loading }) => {
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
      <Input
        name={'total'}
        value={total}
        label="Venta en total"
        InputProps={{
          readOnly: true,
          sx: {
            color: 'blue',
            fontWeight: 900,
            backgroundColor: '#f5f5f5',
          },
        }}
        inputProps={{
          style: {
            fontSize: '30px',
            padding: '4px',
          },
        }}
      />
      <Input
        name={'received_money'}
        label="Dinero recibido"
        validate={mix(isNumber())}
        InputProps={{
          sx: {
            fontWeight: 900,
            backgroundColor: '#f5f5f5',
          },
        }}
        inputProps={{
          style: {
            fontSize: '30px',
            padding: '4px',
          },
        }}
      />
      <Input
        name={'change_money'}
        label="Vuelto"
        InputProps={{
          readOnly: true,
          sx: {
            color: 'blue',
            fontWeight: 900,
            backgroundColor: '#f5f5f5',
          },
        }}
        inputProps={{
          style: {
            fontSize: '30px',
            padding: '4px',
          },
        }}
      />
      <SelectField
        name="kind"
        label="Tipo de venta"
        data={[
          {
            id: 'sales_note',
            name: 'Nota de venta',
          },
          {
            id: 'receipt',
            name: 'Boleta',
          },
          {
            id: 'invoice',
            name: 'Factura',
          },
        ]}
        validate={mix(required())}
      />
      <SelectField
        name="state"
        label="Estado de pago"
        data={[
          {
            id: 'payed',
            name: 'Pagado',
          },
          {
            id: 'pending_payment',
            name: 'Pendiente de pago',
          },
        ]}
        validate={mix(required())}
      />
      <Button type="submit" loading={loading} className="relative">
        Guardar Venta
      </Button>
    </span>
  )
}

export default TotalField
