'use client'

import React, { useEffect, useState } from 'react'
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
  TableFooter,
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
import { generateInventoryXLSX } from '@/utils/xlsx'
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Pagination from '@/components/Pagination'
import ShowProductsDialog from '@/components/ShowProductsDialog'
import {
  isAlphanumeric,
  isLetter,
  isNumber,
  length,
  lessThan,
  mix,
  required,
  isInteger,
} from '@/utils/validations'
import ProductsDialog from '@/components/ProductsDialog'
import SearchIcon from '@mui/icons-material/Search'

const Page = () => {
  const { productList, isLoading } = useProducts()
  const { createPurchase, purchaseList, trigger } = usePurchase()
  const [snackBarMessage, setSnackBarMessage] = React.useState({})
  const [loading, setLoading] = useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [page, setPage] = React.useState(0)
  const [selectedPurchase, setSelectedPurchase] = useState(null)
  const [showProductsDialog, setShowProductsDialog] = useState(false)

  useEffect(() => {
    trigger()
  }, [])

  if (isLoading) return <div>Cargando prro...</div>

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
                  clearArray: clearArrayMutator,
                  ...arrayMutators,
                }}
                onSubmit={values => {
                  setLoading(true)
                  createPurchase(values)
                    .then(() => {
                      setSnackBarMessage({
                        message: 'Inventario actualizado correctamente',
                        severity: 'success',
                        open: true,
                      })

                      setTimeout(() => window.location.reload(), 2000)
                    })
                    .catch(() => {
                      setLoading(false)
                      setSnackBarMessage({
                        message:
                          'Hubo un error al actualizar el inventario, actualice la pagina e intente nuevamente',
                        severity: 'error ',
                        open: true,
                      })
                    })
                }}
                initialValues={{ record_type: 0 }}
                validate={values => {
                  const errors = {}
                  if (!values.purchase_details_attributes) {
                    errors.purchase_details_attributes =
                      'Ingrese al menos un producto'
                  }
                  return errors
                }}
                render={({ handleSubmit, form: { change, getFieldState } }) => (
                  <form onSubmit={handleSubmit} className="mb-8">
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
                      {({ fields, meta: { error } }) => (
                        <div className="flex flex-col-2 justify-around items-start gap-4">
                          <div>
                            <div className="flex gap-4">
                              <h2 className="text-2xl mb-4">
                                Ingreso/actualizacion de productos:
                              </h2>
                              <Button
                                onClick={() => setShowProductsDialog(true)}>
                                Seleccionar productos{' '}
                                <SearchIcon className="ml-4" />
                              </Button>
                            </div>
                            <Card>
                              <div className="flex flex-row bg-amber-200 mb-8 gap-4 justify-between p-4 items-center">
                                <Input
                                  name="document_number"
                                  label={'Numero de documento'}
                                  validate={mix(required(), isAlphanumeric())}
                                />
                                <DatePickerField name="date" label={'Fecha'} />
                                <Input
                                  name="supplier_name"
                                  label={'Proveedor'}
                                  validate={mix(isLetter(), required())}
                                />
                                <Input
                                  name="supplier_document_number"
                                  label={'RUC'}
                                  validate={mix(
                                    required(),
                                    length(11),
                                    isNumber(),
                                  )}
                                />
                                <SelectField
                                  className="w-44"
                                  name="record_type"
                                  label="Tipo de Registro"
                                  data={[
                                    {
                                      id: 0,
                                      name: 'Compra',
                                    },
                                    {
                                      id: 1,
                                      name: 'Actualizacion de producto',
                                    },
                                  ]}
                                  validate={mix(required())}
                                />
                                <Button type="submit" loading={loading}>
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
                                    <TableCell align="center" width={100}>
                                      Precio de compra
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
                                            name={`purchase_details_attributes[${index}].location`}
                                          />
                                        </TableCell>
                                        <TableCell width={140}>
                                          <Input
                                            name={`purchase_details_attributes[${index}].expiration_date`}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <LabelField
                                            name={`purchase_details_attributes[${index}].stock_quantity`}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input
                                            type="number"
                                            name={`purchase_details_attributes[${index}].quantity`}
                                            onChange={value => {
                                              const initialStockField = getFieldState(
                                                `purchase_details_attributes[${index}].stock_quantity`,
                                              )

                                              if (Number(value)) {
                                                const initialStock =
                                                  initialStockField?.value || 0
                                                change(
                                                  `purchase_details_attributes[${index}].last_stock`,
                                                  initialStock + Number(value),
                                                )
                                              }
                                            }}
                                            validate={mix(
                                              required(),
                                              isInteger(),
                                            )}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <LabelField
                                            name={`purchase_details_attributes[${index}].last_stock`}
                                            validate={mix(lessThan(0))}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <LabelField
                                            name={`purchase_details_attributes[${index}].initial_price`}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input
                                            type="number"
                                            name={`purchase_details_attributes[${index}].last_price`}
                                            validate={mix(
                                              required(),
                                              isNumber(),
                                              lessThan(0),
                                            )}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input
                                            name={`purchase_details_attributes[${index}].purchase_price`}
                                            validate={mix(
                                              required(),
                                              lessThan(0),
                                            )}
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
                                      <TableCell colSpan={13}>
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
                            </Card>
                          </div>
                          {showProductsDialog && (
                            <ProductsDialog
                              productList={productList}
                              fields={fields}
                              handleClose={() => setShowProductsDialog(false)}
                            />
                          )}
                        </div>
                      )}
                    </FieldArray>
                  </form>
                )}
              />
              <div className="flex gap-4">
                <Button
                  onClick={() => generateInventoryXLSX(purchaseList)}
                  className="mb-4">
                  Descargar <VerticalAlignBottomIcon />
                </Button>
              </div>
              <Table size="small">
                <TableHead>
                  <TableRow className="bg-yellow-500">
                    <TableCell sx={{ fontWeight: 800 }}>Nro</TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>
                      Tipo de registro
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>
                      Nro. de document
                    </TableCell>
                    <TableCell sx={{ minWidth: 300, fontWeight: 800 }}>
                      Fecha de documento
                    </TableCell>
                    <TableCell sx={{ minWidth: 300, fontWeight: 800 }}>
                      Fecha de registro
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>Proveedor</TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>
                      Doc. proveedor
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>
                      Empleado que registra
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>
                      Ver productos
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchaseList
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                    .map((sale, index) => (
                      <TableRow
                        className="hover:bg-yellow-200 active:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300"
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': {
                            border: 0,
                          },
                        }}>
                        <TableCell component="th" scope="row">
                          {sale.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {sale.record_type === 'compras'
                            ? 'Compra'
                            : 'Actualizacion de producto'}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {sale.document_number}
                        </TableCell>
                        <TableCell align="left">{sale.date}</TableCell>
                        <TableCell align="left">{sale.created_at}</TableCell>
                        <TableCell>{sale.supplier_name}</TableCell>
                        <TableCell>{sale.supplier_document_number}</TableCell>
                        <TableCell>{sale.employee_name}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => setSelectedPurchase(sale)}
                            color="primary">
                            <VisibilityIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                  <Pagination
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    page={page}
                    setPage={setPage}
                    count={purchaseList?.length}
                  />
                </TableFooter>
              </Table>
            </div>
          </div>
        </div>
      </div>
      {selectedPurchase && (
        <ShowProductsDialog
          handleClose={() => setSelectedPurchase(null)}
          purchase={selectedPurchase}
        />
      )}
    </>
  )
}

export default Page
