'use client'

import React from 'react'
import Header from '@/app/(app)/Header'
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

const Page = () => {
  const { productList, isLoading } = useProducts()
  const { createSale } = useSales()
  const [hoveredRow, setHoveredRow] = React.useState(null)
  const router = useRouter()

  if (isLoading) return <div>Cargando prro...</div>

  return (
    <>
      <Header title="Scrum poker" />
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
                  createSale(values).then(() => router.push('/sales'))
                }}
                initialValues={{
                  state: 'payed',
                  kind: 'sales_note',
                }}
                render={({ handleSubmit, submitting }) => (
                  <form onSubmit={handleSubmit}>
                    <FieldArray name="sale_details_attributes">
                      {({ fields }) => (
                        <div className="flex flex-col-2 justify-around items-start gap-4">
                          <div>
                            <h2 className="text-2xl mb-4">Nueva venta:</h2>
                            <Card>
                              <div className="flex flex-row bg-amber-200 mb-8 gap-4 justify-between p-4 items-center">
                                <Input name="name" label={'Nombre'} />
                                <Input
                                  name="description"
                                  label={'Descripcion'}
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
                                />
                                <Button type="submit" disabled={submitting}>
                                  Guardar Venta
                                </Button>
                              </div>
                              <Table className="mb-8" size="small">
                                <TableHead>
                                  <TableRow
                                    className="bg-blue-500"
                                    onMouseUp={() => {}}>
                                    <TableCell align="center" width={8}>
                                      Nro.
                                    </TableCell>
                                    <TableCell align="center" width={400}>
                                      Producto (Lote)
                                    </TableCell>
                                    <TableCell align="center">
                                      Laboratorio
                                    </TableCell>
                                    <TableCell align="center">U_M</TableCell>
                                    <TableCell align="center">
                                      Ubicacion
                                    </TableCell>
                                    <TableCell align="center">
                                      Fecha de vencimiento
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
                                          {product.laboratory}
                                        </TableCell>
                                        <TableCell>
                                          {product.unid_med}
                                        </TableCell>
                                        <TableCell>
                                          {product.location}
                                        </TableCell>
                                        <TableCell>
                                          {product.expirationDate}
                                        </TableCell>
                                        <TableCell>
                                          {product.initialStok}
                                        </TableCell>
                                        <TableCell>
                                          <Input
                                            name={`sale_details_attributes[${index}].quantity`}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input
                                            name={`sale_details_attributes[${index}].price`}
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
                              <TotalField />
                              {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}
                            </Card>
                          </div>
                          <div>
                            <h2 className="text-2xl mb-4">
                              Listado de productos:
                            </h2>
                            <Card>
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      sx={{
                                        width: 350,
                                        fontWeight: 800,
                                      }}>
                                      Nombre
                                    </TableCell>
                                    <TableCell
                                      sx={{ fontWeight: 800 }}
                                      align="right">
                                      Precio
                                    </TableCell>
                                    <TableCell
                                      sx={{ fontWeight: 800 }}
                                      align="right">
                                      Stock
                                    </TableCell>
                                    <TableCell
                                      sx={{ fontWeight: 800 }}
                                      align="right">
                                      Lote
                                    </TableCell>
                                    <TableCell
                                      sx={{ fontWeight: 800 }}
                                      align="right">
                                      F. V.
                                    </TableCell>
                                    <TableCell
                                      sx={{ fontWeight: 800 }}
                                      align="right">
                                      Ubicacion
                                    </TableCell>
                                    <TableCell
                                      sx={{ fontWeight: 800 }}
                                      align="right">
                                      Laboratorio
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {productList?.map((product, index) => (
                                    <TableRow
                                      onClick={() => {
                                        const foundProductIndex = fields.value?.findIndex(
                                          _product =>
                                            _product.product_id === product.id,
                                        )
                                        if (foundProductIndex >= 0) {
                                          const foundProduct =
                                            fields.value[foundProductIndex]
                                          fields.update(foundProductIndex, {
                                            ...foundProduct,
                                            quantity:
                                              Number(foundProduct.quantity) + 1,
                                          })
                                        } else {
                                          const { id, ...rest } = product
                                          fields.push({
                                            quantity: 1,
                                            product_id: product.id,
                                            price: product.salePriceIncIGV,
                                            composed_name: `${product.name} (${
                                              product.lote || ' - '
                                            })`,
                                            sub_total:
                                              1 * product.salePriceIncIGV,
                                            ...rest,
                                          })
                                        }
                                      }}
                                      className={
                                        hoveredRow === index &&
                                        'bg-amber-400 cursor-pointer'
                                      }
                                      onMouseEnter={() => setHoveredRow(index)}
                                      onMouseLeave={() => setHoveredRow(null)}
                                      key={index}
                                      sx={{
                                        '&:last-child td, &:last-child th': {
                                          border: 0,
                                        },
                                      }}>
                                      <TableCell>{product.name}</TableCell>
                                      <TableCell>
                                        {product.salePriceIncIGV}
                                      </TableCell>
                                      <TableCell>
                                        {product.initialStok}
                                      </TableCell>
                                      <TableCell>{product.lote}</TableCell>
                                      <TableCell>
                                        {product.expirationDate}
                                      </TableCell>
                                      <TableCell>{product.location}</TableCell>
                                      <TableCell>
                                        {product.Laboratory}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Card>
                          </div>
                        </div>
                      )}
                    </FieldArray>
                    {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}
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
