'use client'

import useCustomers from "@/hooks/useCustomers"
import Header from '@/app/(app)/Header'
import Input from '@/components/Input';
import { Form } from 'react-final-form';
import Button from "@/components/Button";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

const Page = () => {
    const { customerList, createCustomer, isLoanding } = useCustomers()
  return (
    <div>
      <Header title="Customer" />
      <div>
        <Form
          onSubmit={values => createCustomer(values)}
          render={({ handleSubmit, submitting}) => (
            <form onSubmit={handleSubmit}>
              <Input name="person_attributes.codigo" label={'Codigo'}/>
             {/* <Input name="identity_type_id" label={'Tipo de Documento de identidad'}/> */}
              <Input name="person_attributes.dni" label={'Documento de Identidad'}/>
              <Input name="company_name" label={'Razon Social'}/>
              <Input name="tax_address" label={'Direccion Fiscal'}/>
              <Input name="person_attributes.email" label={'Email'}/>
              <Input name="person_attributes.telephone" label={'Telefono'}/>
              <Input name="person_attributes.cellphone" label={'Celular'}/>
              <Input name="location_code" label={'Ubigeo'}/>
              <Input name="details" label={'details'}/>
              <Button type="submit" disabled={submitting}>
                Crear Cliente 
              </Button>       
            </form>
          )
        }
        />
        <pre>{JSON.stringify(customerList, null, 2)}</pre>
      </div>
    </div>
  )  
} 

export default Page