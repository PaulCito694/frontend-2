'use client'

import Button from '@/components/Button'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import React from 'react'
import { Form } from 'react-final-form'
import {
  isAlphanumeric,
  isLetter,
  mix,
  required,
  isInteger,
  isEmail,
} from '@/utils/validations'
import Input from '@/components/Input'
import { redirect } from 'next/navigation'
import SelectField from '@/components/SelectField'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'

const Page = () => {
  const [loading, setLoading] = React.useState(false)
  const { register } = useAuth()

  return (
    <>
      <Form
        onSubmit={values => {
          setLoading(true)
          register(values)
            .then(() => redirect('/login'))
            .finally(() => setLoading(false))
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Input
              name="name"
              label={'Nombre'}
              validate={mix(required(), isLetter())}
            />
            <Input
              name="lastname"
              label={'Apellido'}
              validate={mix(required(), isLetter())}
            />
            <Input
              name="password"
              label={'Contrasena'}
              validate={mix(required())}
              type="password"
            />
            <Input
              name="confirm_password"
              label={'Confirmar contrasena'}
              validate={(value, row) => {
                return value !== row['password']
                  ? 'Las contrasenas no coinciden.'
                  : undefined
              }}
              type="password"
            />
            <SelectField
              name="role"
              label={'Rol en el sistema'}
              data={[
                { id: 'admin', name: 'Administrador' },
                { id: 'seller', name: 'Vendedor' },
                { id: 'finance', name: 'Contador' },
              ]}
            />

            <Accordion>
              <AccordionSummary>Datos opcionales</AccordionSummary>
              <AccordionDetails>
                <Input
                  name="codigo"
                  label={'Codigo'}
                  validate={mix(isAlphanumeric())}
                />
                <Input name="dni" label={'DNI'} validate={mix(isInteger())} />

                <Input name="email" label={'EMAIL'} validate={mix(isEmail())} />

                <Input
                  name="cellphone"
                  label={'Celular'}
                  validate={mix(isInteger())}
                />
              </AccordionDetails>
            </Accordion>

            <Link
              href="/login"
              className="underline text-sm text-gray-600 hover:text-gray-900">
              Ya estas registrado?
            </Link>

            <Button type="submit" loading={loading}>
              Registrar
            </Button>
          </form>
        )}
      />
    </>
  )
}

export default Page
