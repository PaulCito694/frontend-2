import { useField, useForm } from 'react-final-form'
import React, { useEffect } from 'react'
import Input from '@/components/Input'
import useCustomers from '@/hooks/useCustomers'

const CustomerFields = () => {
  const { findCustomerByDni, findAsyncCustomer } = useCustomers()
  const { mutators } = useForm()
  const { input: dni } = useField('customer.person_attributes.dni')

  useEffect( () => {
    if( Number(dni.value.length) === 8){
      const foundCustomer = findCustomerByDni(dni.value)
      console.log(foundCustomer)
      if (foundCustomer && foundCustomer.customer_id){
        mutators.change("customer.person_attributes.email",foundCustomer.person_attributes.email)
        mutators.change("customer.person_attributes.name",foundCustomer.person_attributes.name)
        mutators.change("customer.person_attributes.telephone",foundCustomer.person_attributes.telephone)
        mutators.change("customer.tax_address",foundCustomer.tax_address)
        mutators.change("customer.id",foundCustomer.customer_id)
        mutators.change("customer.person_attributes.id",foundCustomer.person_attributes.id)
      }else{
        findAsyncCustomer(dni.value).then( data =>{
          mutators.change("customer.person_attributes.name",data["nombres"])

        })
      }
    } else if (dni.value.length < 8) {
      mutators.change('customer.person_attributes.email', '');
      mutators.change('customer.person_attributes.name', '');
      mutators.change('customer.person_attributes.telephone', '');
      mutators.change('customer.tax_address', '');
      mutators.change('customer.id', '');
      mutators.change('customer.person_attributes.id', '');
    }
  },[dni.value])

  return (
    <span className="bg-green-300 p-2 mb-4 flex gap-4">
      <Input 
        // parentClassName="hidden"
        name="customer.id"
        label={'id'}
      />
      <Input 
        // parentClassName="hidden"
        name="customer.person_attributes.id"
        label={'id'}
      />
      <Input 
        name="customer.person_attributes.name"
        label={'Nombre'} 
      />
      <Input
        name="customer.tax_address"
        label={'Direccion'}
      />
      <Input
        name="customer.person_attributes.email"
        label={'Email'}
      />
      <Input
        name="customer.person_attributes.telephone"
        label={'Telefono'}
      />
    </span>
  )
}

export default CustomerFields
