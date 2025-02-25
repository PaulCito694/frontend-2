'use client'

import useCustomers from '@/hooks/useCustomers'
import Input from '@/components/Input'
import { Form } from 'react-final-form'
import Button from '@/components/Button'
import useIdentityType from '@/hooks/useIdentityType'
import SelectField from '@/components/SelectField'
import Loading from '@/app/Loading'
import React from 'react'

const Page = () => {
  const { createCustomer } = useCustomers()
  const {
    identityTypeList,
    isLoading: isIdentityTypeLoading,
  } = useIdentityType()
  if (isIdentityTypeLoading) return <Loading />
  return (
    <div>
      <div>
        <Form
          onSubmit={values => createCustomer(values)}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 grid-cols-4 mb-4">
                <Input name="person_attributes.codigo" label={'Codigo'} />
                <SelectField
                  name="identity_type_id"
                  label={'Tipo de identidad'}
                  data={identityTypeList}
                />
                <Input name="company_name" label={'Razon Social'} />
                <Input name="tax_address" label={'Direccion Fiscal'} />
                <Input name="person_attributes.email" label={'Email'} />
                <Input name="person_attributes.telephone" label={'Telefono'} />
                <Input name="person_attributes.cellphone" label={'Celular'} />
                <Input name="location_code" label={'Ubigeo'} />
                <Input name="details" label={'details'} />
              </div>
              <Button type="submit" disabled={submitting}>
                Crear Cliente
              </Button>
            </form>
          )}
        />
      </div>
    </div>
  )
}

export default Page
