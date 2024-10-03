'use client'

import React, { useEffect } from 'react'
import Header from '@/app/(app)/Header'
import { Form } from 'react-final-form'
import Button from '@/components/Button'
import { clearMutator } from 'utils/mutators'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import Input from '@/components/Input'
import useProducts from '@/hooks/useProducts'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

const Page = () => {
  const { productList, isLoading, createProduct } = useProducts()
  const [hoveredRow, setHoveredRow] = React.useState(null)
  const [total, setTotal] = React.useState(0)

  if (isLoading) return <div>Cargando prro...</div>

  return (
    <>
      <Header title="Scrum poker" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <Form
                mutators={{ clear: clearMutator, ...arrayMutators }}
                onSubmit={values => createProduct(values)}
                render={({ handleSubmit, submitting, values }) => (
                  <form onSubmit={handleSubmit}>
                    <FieldArray name="products">
                      {({ fields }) => (
                        <div className="flex flex-col-2 justify-around items-center gap-4">
                          <div>
                            <h2>Nueva venta:</h2>
                            <div className="flex flex-row items-start bg-amber-200">
                              <Input name="name" label={'Nombre'} />
                              <Input name="description" label={'Descripcion'} />
                              <Button type="submit" disabled={submitting}>
                                Guardar Venta
                              </Button>
                            </div>
                            <Table size="small">
                              <TableHead>
                                <TableRow
                                  className="bg-blue-500"
                                  onMouseUp={() => {}}>
                                  <TableCell>Nro.</TableCell>
                                  <TableCell align="right">
                                    Descripcion
                                  </TableCell>
                                  <TableCell align="right">Lote</TableCell>
                                  <TableCell align="right">U. M.</TableCell>
                                  <TableCell align="right">Cantidad</TableCell>
                                  <TableCell align="right">Precio</TableCell>
                                  <TableCell align="right">Sub Total</TableCell>
                                  <TableCell align="right">Eliminar</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {fields.value?.map((product, index) => (
                                  <TableRow
                                    key={index}
                                    className="flex flex-row items-start">
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                      <Input name={`products[${index}].name`} />
                                      <Input
                                        parentClassName="hidden "
                                        name={`products[${index}].product_id`}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input name={`products[${index}].lote`} />
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        name={`products[${index}].unid_med`}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        name={`products[${index}].quantity`}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        name={`products[${index}].price`}
                                      />
                                    </TableCell>
                                    <TableCell width={100}>
                                      <Input
                                        disabled
                                        value={product.quantity * product.price}
                                        name={`products[${index}].sub_total`}
                                      />
                                    </TableCell>
                                    <TableCell width={50}>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          fields.remove(index)
                                        }}>
                                        Quitar
                                      </button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                                <TableRow>
                                  <Input
                                    name="total"
                                    value={values.products?.total}
                                  />
                                </TableRow>
                              </TableBody>
                            </Table>
                            {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}
                          </div>
                          <div>
                            <p>Productos</p>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Nombre</TableCell>
                                  <TableCell align="right">Precio</TableCell>
                                  <TableCell align="right">Stock</TableCell>
                                  <TableCell align="right">Lote</TableCell>
                                  <TableCell align="right">F. V.</TableCell>
                                  <TableCell align="right">Ubicacion</TableCell>
                                  <TableCell align="right">
                                    Laboratorio
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {productList.map((product, index) => (
                                  <TableRow
                                    onClick={() => {
                                      const foundProduct = fields.value?.find(
                                        _product =>
                                          _product.product_id === product.id,
                                      )
                                      if (foundProduct)
                                        fields.update(index, {
                                          ...foundProduct,
                                          quantity: foundProduct.quantity + 1,
                                        })
                                      else
                                        fields.push({
                                          quantity: 1,
                                          product_id: product.id,
                                          ...product,
                                        })
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
                                    <TableCell component="th" scope="row">
                                      {product.name}
                                    </TableCell>
                                    <TableCell align="right">
                                      {product.price}
                                    </TableCell>
                                    <TableCell align="right">
                                      {product.stock}
                                    </TableCell>
                                    <TableCell align="right">
                                      {product.lote}
                                    </TableCell>
                                    <TableCell align="right">
                                      {product.expiration_at}
                                    </TableCell>
                                    <TableCell align="right">
                                      {product.ubication}
                                    </TableCell>
                                    <TableCell align="right">
                                      {product.Laboratory}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
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
