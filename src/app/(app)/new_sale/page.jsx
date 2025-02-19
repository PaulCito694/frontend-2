'use client'

import React, { useState } from 'react'
import { Form } from 'react-final-form'
import Button from '@/components/Button'
import { changeMutator, clearMutator } from 'utils/mutators'
import {
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import Input from '@/components/Input'
import useProducts from '@/hooks/useProducts'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import TotalField from '@/app/(app)/new_sale/components/TotalField'
import useSales from '@/hooks/useSales'
import { useRouter } from 'next/navigation'
import RemoveCircle from '@mui/icons-material/RemoveCircle'
import SelectField from '@/components/SelectField'
import {
  isInteger,
  isNumber,
  lessThan,
  mix,
  moreThan,
  required,
} from '@/utils/validations'
import useCustomers from '@/hooks/useCustomers'
import CustomerFields from './components/CustomerField'
import useIdentityType from '@/hooks/useIdentityType'
import ProductsDialog from '@/components/ProductsDialog'
import Loading from '@/app/Loading'

const Page = () => {
  const { isLoading: isCustomerLoading } = useCustomers()
  const {
    identityTypeList,
    isLoading: isIdentityTypeLoading,
  } = useIdentityType()
  const { productList, isLoading } = useProducts()
  const { createSale } = useSales()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  if (isLoading || isCustomerLoading || isIdentityTypeLoading)
    return <Loading />

  return (
    <>
      <div className="py-12">
        <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <Form
                mutators={{
                  clear: clearMutator,
                  change: changeMutator,
                  ...arrayMutators,
                }}
                onSubmit={values => {
                  setLoading(true)
                  createSale(values)
                    .then(() => router.push('/sales'))
                    .finally(() => setLoading(false))
                }}
                initialValues={{
                  state: 'payed',
                  kind: 'sales_note',
                }}
                validate={values => {
                  const errors = {}
                  if (!values.sale_details_attributes) {
                    errors.sale_details_attributes =
                      'Ingrese al menos un producto'
                  }
                  return errors
                }}
                render={({ handleSubmit, form: { change } }) => (
                  <form
                    onSubmit={handleSubmit}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                      }
                    }}>
                    <FieldArray name="sale_details_attributes">
                      {({ fields, meta: { error } }) => (
                        <div className="flex flex-col justify-around items-start gap-4">
                          <div className="w-full">
                            <div className="flex flex-col gap-4">
                              <h2 className="text-2xl mb-4">Nueva venta</h2>
                            </div>
                            <Card className="gap-4">
                              <div className="flex flex-row bg-amber-200 mb-8 gap-4 justify-between p-4 items-center">
                                <SelectField
                                  name="customer.identity_type_id"
                                  label={'Tipo de identidad'}
                                  data={identityTypeList}
                                />
                                <Input
                                  name="customer.person_attributes.dni"
                                  label={'Nro de documento'}
                                />
                                <CustomerFields />
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
                                <Button
                                  type="submit"
                                  loading={loading}
                                  className="relative">
                                  Guardar Venta
                                </Button>
                              </div>
                              <ProductsDialog
                                productList={productList}
                                fields={fields}
                              />
                              <Table className="mb-8" size="small">
                                <TableHead>
                                  <TableRow className="bg-blue-500">
                                    <TableCell align="center" width={8}>
                                      Nro.
                                    </TableCell>
                                    <TableCell align="center" width={400}>
                                      Producto (Lote)
                                    </TableCell>
                                    <TableCell align="center">
                                      Ubicacion
                                    </TableCell>
                                    <TableCell align="center">
                                      Laboratorio
                                    </TableCell>
                                    <TableCell align="center">
                                      Unidad de medida
                                    </TableCell>
                                    <TableCell align="center">Stock</TableCell>
                                    <TableCell align="center">
                                      Cantidad
                                    </TableCell>
                                    <TableCell align="center" width={100}>
                                      Precio
                                    </TableCell>
                                    <TableCell align="center">
                                      Sub Total
                                    </TableCell>
                                    <TableCell align="center">Quitar</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {fields.value ? (
                                    fields.value.map((product, index) => (
                                      <TableRow
                                        key={index}
                                        className="flex flex-row items-start">
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                          {product.composed_name}
                                          <Input
                                            parentClassName="hidden "
                                            name={`sale_details_attributes[${index}].product_id`}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          {product.location}
                                        </TableCell>
                                        <TableCell>
                                          {product.laboratory}
                                        </TableCell>
                                        <TableCell>
                                          <Input
                                            name={`sale_details_attributes[${index}].unit_of_measure_product_id`}
                                            parentClassName="hidden"
                                          />
                                          <SelectField
                                            name={`sale_details_attributes[${index}].unit_of_measure_product_value`}
                                            data={[
                                              {
                                                id: 'unit',
                                                name: 'UNIDAD',
                                              },
                                              ...product.unit_of_measure_products.map(
                                                item => ({
                                                  id: item.id,
                                                  name: `${item.name} (${item.quantity})`,
                                                }),
                                              ),
                                            ]}
                                            initialValue={'unit'}
                                            onChange={value => {
                                              const unit_of_measure = product.unit_of_measure_products.find(
                                                item => item.id === value,
                                              )
                                              if (unit_of_measure) {
                                                change(
                                                  `sale_details_attributes[${index}].price`,
                                                  unit_of_measure.price,
                                                )
                                                change(
                                                  `sale_details_attributes[${index}].unit_of_measure_product_id`,
                                                  value,
                                                )
                                              } else {
                                                change(
                                                  `sale_details_attributes[${index}].price`,
                                                  product.sale_price_inc_igv,
                                                )
                                                change(
                                                  `sale_details_attributes[${index}].unit_of_measure_product_id`,
                                                  undefined,
                                                )
                                              }
                                            }}
                                            validate={required()}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          {product.stock_quantity}
                                        </TableCell>
                                        <TableCell>
                                          <Input
                                            type="number"
                                            name={`sale_details_attributes[${index}].quantity`}
                                            validate={mix(
                                              required(),
                                              isInteger(),
                                              moreThan(
                                                product.stock_quantity + 1,
                                                'No puede vender mas de lo que se encuentra en stock.',
                                              ),
                                              lessThan(1),
                                            )}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input
                                            type="number"
                                            name={`sale_details_attributes[${index}].price`}
                                            validate={mix(
                                              required(),
                                              isNumber(),
                                              lessThan(
                                                product.sale_price_inc_igv,
                                                'No puede vender a un precio menor del establecido.',
                                              ),
                                            )}
                                          />
                                        </TableCell>
                                        <TableCell width={100}>
                                          <Input
                                            disabled
                                            name={`sale_details_attributes[${index}].sub_total`}
                                          />
                                        </TableCell>
                                        <TableCell width={50}>
                                          <IconButton
                                            onClick={() => {
                                              fields.remove(index)
                                            }}
                                            sx={{ padding: 0 }}>
                                            <RemoveCircle />
                                          </IconButton>
                                        </TableCell>
                                      </TableRow>
                                    ))
                                  ) : (
                                    <TableRow>
                                      <TableCell colSpan={8}>
                                        Sin productos seleccionados. Para
                                        seleccionar debe buscar en la tabla
                                        derecha y luego hacer click sobre el
                                        producto.
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </TableBody>
                              </Table>
                              {!Array.isArray(error) && (
                                <span className="text-red-500">{error}</span>
                              )}
                              <TotalField />
                            </Card>
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
