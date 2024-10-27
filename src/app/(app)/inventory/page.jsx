'use client'

import React from 'react'
import Header from '@/app/(app)/Header'
import { Form } from 'react-final-form'
import Button from '@/components/Button'
import { changeMutator, clearArrayMutator, clearMutator } from 'utils/mutators'
import {
  Alert,
  Card,
  IconButton,
  Snackbar,
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
import RemoveCircle from '@mui/icons-material/RemoveCircle'
import LabelField from '@/components/LabelField'
import DatePickerField from '@/components/DatePickerField'
import usePurchase from '@/hooks/usePurchase'
import SelectField from '@/components/SelectField'

const Page = () => {
  const { productList, isLoading } = useProducts()
  const { createPurchase } = usePurchase()
  const [hoveredRow, setHoveredRow] = React.useState(null)
  const [snackBarMessage, setSnackBarMessage] = React.useState({})

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
                  clearArray: clearArrayMutator,
                  ...arrayMutators,
                }}
                onSubmit={values => {
                  createPurchase(values)
                    .then(() => {
                      setSnackBarMessage({
                        message: 'Inventario actualizado correctamente',
                        severity: 'success',
                        open: true,
                      })

                      setTimeout(() => window.location.reload(), 3000)
                    })
                    .catch(() =>
                      setSnackBarMessage({
                        message:
                          'Hubo un error al actualizar el inventario, actualice la pagina e intente nuevamente',
                        severity: 'error ',
                        open: true,
                      }),
                    )
                }}
                render={({
                  handleSubmit,
                  submitting,
                  values,
                  form: { change, getFieldState },
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Snackbar
                      open={snackBarMessage?.open}
                      autoHideDuration={3000}
                      onClose={() => setSnackBarMessage(null)}
                      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                      <Alert
                        onChange={() => setSnackBarMessage(null)}
                        severity={snackBarMessage?.severity}>
                        {snackBarMessage?.message}
                      </Alert>
                    </Snackbar>
                    <FieldArray name="purchase_details_attributes">
                      {({ fields }) => (
                        <div className="flex flex-col-2 justify-around items-start gap-4">
                          <div>
                            <h2 className="text-2xl mb-4">
                              Ingreso/actualizacion de productos:
                            </h2>
                            <Card>
                              <div className="flex flex-row bg-amber-200 mb-8 gap-4 justify-between p-4 items-center">
                                <Input
                                  name="document_number"
                                  label={'Numero de documento'}
                                />
                                <DatePickerField name="date" label={'Fecha'} />
                                <Input
                                  name="supplier_name"
                                  label={'Proveedor'}
                                />
                                <Input
                                  name="supplier_document_number"
                                  label={'RUC'}
                                />
                                <SelectField
                                  name="record_type"
                                  label="Tipo de Registro"
                                  data={[
                                    {
                                      id: 0,
                                      name: 'compra'
                                    },
                                    {
                                      id: 1,
                                      name: 'actualizacion de producto'
                                    }
                                  ]}
                                />
                                <Button disabled={submitting} type="submit">
                                  Guardar Compra
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
                                    <TableCell align="center">
                                      Stock actual
                                    </TableCell>
                                    <TableCell align="center">
                                      Ingreso
                                    </TableCell>
                                    <TableCell align="center">
                                      Nuevo stock
                                    </TableCell>
                                    <TableCell align="center" width={100}>
                                      Precio Actual
                                    </TableCell>
                                    <TableCell align="center" width={100}>
                                      Nuevo Precio
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
                                            name={`purchase_details_attributes[${index}].product_id`}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          {product.laboratory}
                                        </TableCell>
                                        <TableCell>
                                          {product.unid_med}
                                        </TableCell>
                                        <TableCell>
                                          <Input
                                            initialValue={product.location}
                                            name={`purchase_details_attributes[${index}].location`}
                                          />
                                        </TableCell>
                                        <TableCell width={140}>
                                          <Input
                                            initialValue={
                                              product.expirationDate
                                            }
                                            name={`purchase_details_attributes[${index}].expiration_date`}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <LabelField
                                            name={`purchase_details_attributes[${index}].initial_stock`}
                                            initialValue={product.initialStok}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input
                                            name={`purchase_details_attributes[${index}].quantity`}
                                            onChange={value => {
                                              const initialStockField = getFieldState(
                                                `purchase_details_attributes[${index}].initial_stock`,
                                              )

                                              const initialStock =
                                                initialStockField?.value || 0
                                              change(
                                                `purchase_details_attributes[${index}].last_stock`,
                                                initialStock + Number(value),
                                              )
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <LabelField
                                            initialValue={
                                              product.initial_stock + 1
                                            }
                                            name={`purchase_details_attributes[${index}].last_stock`}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <LabelField
                                            initialValue={product.price}
                                            name={`purchase_details_attributes[${index}].initial_price`}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input
                                            initialValue={product.price}
                                            name={`purchase_details_attributes[${index}].last_price`}
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
                              {/*<TotalField />*/}
                              <pre>{JSON.stringify(values, null, 2)}</pre>
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
                                      sx={{ width: 350, fontWeight: 800 }}>
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
                                          const { id, ...rest } = product // eslint-disable-line no-unused-vars
                                          fields.push({
                                            quantity: 1,
                                            product_id: product.id,
                                            price: product.sale_price_inc_igv,
                                            composed_name: `${product.name} (${
                                              product.lote || ' - '
                                            })`,
                                            sub_total:
                                              1 * product.sale_price_inc_igv,
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
                                        {product.sale_price_inc_igv}
                                      </TableCell>
                                      <TableCell>
                                        {product.initial_stock}
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
