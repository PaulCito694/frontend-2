import { useField, useForm } from 'react-final-form'
import React, { useEffect } from 'react'
import Input from '@/components/Input'
import useCustomers from '@/hooks/useCustomers'

const CustomerFields = () => {
  const { findCustomerByDni } = useCustomers()
  const { mutators } = useForm()
  const { input: dni } = useField('customer_attributes.person_attributes.dni')

  useEffect( () => {
    if( Number(dni.value.length) === 8){
      const foundCustomer = findCustomerByDni(dni.value)
      if (foundCustomer && foundCustomer.customer_id){
        mutators.change("customer_attributes.person_attributes.email",foundCustomer.person_attributes.email)
        mutators.change("customer_attributes.person_attributes.name",foundCustomer.person_attributes.name)
        mutators.change("customer_attributes.person_attributes.telephone",foundCustomer.person_attributes.telephone)
        mutators.change("customer_attributes.tax_address",foundCustomer.tax_address)
        mutators.change("customer_id",foundCustomer.customer_id)
      }
    }
  },[dni.value])

  return (
    <span className="bg-green-300 p-2 mb-4 flex gap-4">
      <Input 
        parentClassName="hidden"
        name="customer_id"
        label={'id'}
      />
      <Input 
        name="customer_attributes.person_attributes.name"
        label={'Nombre'} 
      />
      <Input
        name="customer_attributes.tax_address"
        label={'Direccion'}
      />
      <Input
        name="customer_attributes.person_attributes.email"
        label={'Email'}
      />
      <Input
        name="customer_attributes.person_attributes.telephone"
        label={'Telefono'}
      />
    </span>
  )
}

export default CustomerFields
