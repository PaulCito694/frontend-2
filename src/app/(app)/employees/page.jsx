'use client'

import useEmployees from '@/hooks/useEmployees'
import Header from '@/app/(app)/Header'
import Input from '@/components/Input'
import { Form } from 'react-final-form'
import Button from '@/components/Button'

const Page = () => {
  const { employeeList, createEmployee, isLoanding } = useEmployees()
  return (
    <div>
      <Header title="Employee" />
      <div className="py-12">
        <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div>
                <Form
                  onSubmit={values => createEmployee(values)}
                  render={({ handleSubmit, submitting }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="grid grid-cols-4 gap-4">
                      <Input name="person_attributes.codigo" label={'Codigo'} />
                      <Input name="password" label={'Contraseña'} />
                      <Input name="person_attributes.name" label={'Nombre'} />
                      <Input
                        name="person_attributes.last_name"
                        label={'Apellido'}
                      />
                      {/* <Input name="role_id" label={'Rol'}/> */}
                      <Input name="person_attributes.email" label={'Email'} />
                      <Input
                        name="person_attributes.telephone"
                        label={'Telefono'}
                      />
                      <Input
                        name="person_attributes.cellphone"
                        label={'Celular'}
                      />
                      <Input
                        name="branch_or_storage"
                        label={
                          'Seleciona la sucursal/almacen a donde sera asignado el usuario'
                        }
                      />
                      <Input name="print_mode" label={'Modo de Imprimir'} />
                      <Button type="submit" disabled={submitting}>
                        Crear Empleado
                      </Button>
                    </form>
                  )}
                />
                <pre>{JSON.stringify(employeeList, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Page
