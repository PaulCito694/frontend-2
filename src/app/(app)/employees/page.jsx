'use client'

import useEmployees from '@/hooks/useEmployees'
import Input from '@/components/Input'
import { Form } from 'react-final-form'
import Button from '@/components/Button'
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SelectField from '@/components/SelectField'
import useRoles from '@/hooks/useRoles'
import SwitchField from '@/components/SwitchField'

const Page = () => {
  const {
    employeeList,
    createEmployee,
    isLoading: isEmployeeLoading,
    updateEmployeeById,
  } = useEmployees()
  const { roleList, isLoading: isRolesLoading } = useRoles()

  if (isEmployeeLoading || isRolesLoading) return <div>Cargandooo...</div>
  return (
    <div>
      <div className="py-12">
        <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div>
                <Form
                  onSubmit={values => {
                    if (values['id']) {
                      updateEmployeeById(values)
                    } else createEmployee(values)
                  }}
                  render={({ handleSubmit, submitting, form: { reset } }) => (
                    <form className="mb-8" onSubmit={handleSubmit}>
                      <div className="grid gap-4 grid-cols-4 mb-4">
                        <Input
                          name="id"
                          label={'id'}
                          parentClassName="hidden"
                        />
                        <Input
                          name="person_attributes.codigo"
                          label={'Codigo'}
                        />
                        <Input name="password" label={'Contraseña'} />
                        <Input name="person_attributes.name" label={'Nombre'} />
                        <Input
                          name="person_attributes.lastname"
                          label={'Apellido'}
                        />
                        <SelectField
                          name="role_id"
                          label={'Rol'}
                          data={roleList}
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
                        <SwitchField name="active" label={'Activar'} />
                      </div>
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="mb-8">
                        Crear Empleado
                      </Button>
                      <div className="overflow-x-auto">
                        <Table className="mb-8" size="small">
                          <TableHead>
                            <TableRow
                              className="bg-blue-500"
                              onMouseUp={() => {}}>
                              <TableCell align="center">Codigo</TableCell>
                              <TableCell align="center" width={400}>
                                Password
                              </TableCell>
                              <TableCell align="center">Nombre</TableCell>
                              <TableCell align="center">Apellido</TableCell>
                              <TableCell align="center">Email</TableCell>
                              <TableCell align="center" width={100}>
                                Telefono
                              </TableCell>
                              <TableCell align="center">Celular</TableCell>
                              <TableCell align="center">
                                Sucursal/Almacen
                              </TableCell>
                              <TableCell align="center">
                                Modo de Imprimir
                              </TableCell>
                              <TableCell align="center">Activar</TableCell>
                              <TableCell align="center">Acciones</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {employeeList?.map((employee, index) => {
                              return (
                                <TableRow className="flex" key={index}>
                                  <TableCell>
                                    {employee.person_attributes.codigo}
                                  </TableCell>
                                  <TableCell>{employee.password}</TableCell>
                                  <TableCell>
                                    {employee.person_attributes.name}
                                  </TableCell>
                                  <TableCell>
                                    {employee.person_attributes.lastname}
                                  </TableCell>
                                  <TableCell>
                                    {employee.person_attributes.email}
                                  </TableCell>
                                  <TableCell>
                                    {employee.person_attributes.telephone}
                                  </TableCell>
                                  <TableCell>
                                    {employee.person_attributes.cellphone}
                                  </TableCell>
                                  <TableCell>
                                    {employee.branch_or_storage}
                                  </TableCell>
                                  <TableCell>{employee.print_mode}</TableCell>
                                  <TableCell>
                                    {employee.active ? 'activo' : 'desactivo'}
                                  </TableCell>
                                  <TableCell>
                                    <IconButton
                                      onClick={() => {
                                        reset(employee)
                                      }}
                                      sx={{ padding: 0 }}>
                                      <EditIcon />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </form>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Page
