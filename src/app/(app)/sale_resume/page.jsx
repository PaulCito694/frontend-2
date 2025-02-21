'use client'

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import useSales from '@/hooks/useSales'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { Form } from 'react-final-form'
import DatePickerField from '@/components/DatePickerField'
import SelectField from '@/components/SelectField'
import moment from 'moment'
import Button from '@/components/Button'
import { mix, required } from '@/utils/validations'
import useEmployees from '@/hooks/useEmployees'
import { generateSalesResumeTicket } from '@/utils/pdf'

const Page = () => {
  const { saleList, trigger } = useSales()
  const { employeeList } = useEmployees()

  return (
    <>
      <div className="pt-12">
        <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <Form
                onSubmit={values => {
                  trigger(
                    `date_lteq=${moment(values.to).format(
                      'YYYY-MM-DD',
                    )}&date_gteq=${moment(values.from).format(
                      'YYYY-MM-DD',
                    )}&employee_id_eq=${values.employee_id}`,
                  )
                }}
                render={({ handleSubmit, submitting }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="flex justify-start gap-4">
                    <SelectField
                      className="w-56"
                      name="employee_id"
                      label="Empleado"
                      data={employeeList?.map(employee => ({
                        id: employee.id,
                        name: employee.person_attributes?.name,
                      }))}
                      validate={mix(required())}
                    />
                    <DatePickerField name="from" label="Desde" />
                    <DatePickerField name="to" label="Hasta" />
                    <Button type="submit" disabled={submitting}>
                      Buscar
                    </Button>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-12">
        <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200 flex gap-4 items-start">
              <div>
                <div className="flex flex-col text-lg gap-4 justify-start">
                  <div className="flex">
                    <h3 className=" mr-2">Ventas de: </h3>
                    <span className="font-bold">
                      {saleList?.resume?.employee?.name}
                    </span>
                  </div>
                  <div className="flex">
                    <h3 className=" mr-2">Fechas: </h3>
                    Desde el{' '}
                    <span className="font-bold mx-2">
                      {saleList?.resume?.from}
                    </span>{' '}
                    hasta al{' '}
                    <span className="font-bold mx-2">
                      {saleList?.resume?.to}
                    </span>
                  </div>
                </div>
                <Table size="small" className="mb-8">
                  <TableHead>
                    <TableRow className="bg-yellow-500">
                      <TableCell sx={{ fontWeight: 800 }}>Nº</TableCell>
                      <TableCell sx={{ minWidth: 300, fontWeight: 800 }}>
                        Codigo
                      </TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Nombre</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Categoria</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>
                        Cantidad vendida
                      </TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>P. Venta</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {saleList?.results?.map((sale, index) =>
                      sale.sale_details?.map(detail => (
                        <TableRow
                          className="hover:bg-yellow-200 active:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300"
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': {
                              border: 0,
                            },
                          }}>
                          <TableCell align="left">{index + 1}</TableCell>
                          <TableCell align="left">
                            {detail.product.code}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {detail.product.name}
                          </TableCell>
                          <TableCell>{detail.product?.category.name}</TableCell>
                          <TableCell>{detail.quantity}</TableCell>
                          <TableCell>{detail.price}</TableCell>
                          <TableCell>S/. {detail.sub_total}</TableCell>
                        </TableRow>
                      )),
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex flex-col gap-4">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ fontWeight: 800 }}
                        colSpan={2}
                        align="center">
                        Notas de venta
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 800 }}
                        colSpan={2}
                        align="center">
                        Boletas
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 800 }}
                        colSpan={2}
                        align="center">
                        Facturas
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 800 }}
                        colSpan={2}
                        align="center">
                        Total ventas
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">Conteo</TableCell>
                      <TableCell align="center">Total</TableCell>
                      <TableCell align="center">Conteo</TableCell>
                      <TableCell align="center">Total</TableCell>
                      <TableCell align="center">Conteo</TableCell>
                      <TableCell align="center">Total</TableCell>
                      <TableCell align="center">Conteo</TableCell>
                      <TableCell align="center">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        {saleList?.resume?.count?.sales_note || 0}
                      </TableCell>
                      <TableCell align="center">
                        {saleList?.resume?.total?.sales_note || 0}
                      </TableCell>
                      <TableCell align="center">
                        {saleList?.resume?.count?.receipt || 0}
                      </TableCell>
                      <TableCell align="center">
                        {saleList?.resume?.total?.receipt || 0}
                      </TableCell>
                      <TableCell align="center">
                        {saleList?.resume?.count?.invoice || 0}
                      </TableCell>
                      <TableCell align="center">
                        {saleList?.resume?.total?.invoice || 0}
                      </TableCell>
                      <TableCell align="center">
                        {saleList?.resume?.count_total || 0}
                      </TableCell>
                      <TableCell align="center">
                        {saleList?.resume?.sum_total || 0}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div>
                  Imprimir
                  <ReceiptIcon
                    onClick={() => generateSalesResumeTicket(saleList)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
