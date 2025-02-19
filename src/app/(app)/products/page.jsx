'use client'

import React from 'react'
import Button from '@/components/Button'
import useProduct from '@/hooks/useProducts'
import { Form } from 'react-final-form'
import Input from '@/components/Input'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button as MaterialButton,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { generateProductsXLSX } from '@/utils/xlsx'
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom'
import useUnitOfMeasures from '@/hooks/useUnitOfMeasure'
import SelectField from '@/components/SelectField'
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'
import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import RemoveCircle from '@mui/icons-material/RemoveCircle'
import {
  isAlphanumeric,
  isInteger,
  isNumber,
  lessThan,
  mix,
  required,
} from '@/utils/validations'
import { markForDestroyMutator } from '@/utils/mutators'
import Loading from '@/app/Loading'

const Page = () => {
  const {
    productList,
    isLoading,
    createProduct,
    deleteProductById,
    updateProductById,
  } = useProduct()

  const { unitOfMeasureList } = useUnitOfMeasures()

  if (isLoading) return <Loading />

  return (
    <div>
      <div className="py-12">
        <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <Form
                mutators={{
                  markForDestroy: markForDestroyMutator,
                  ...arrayMutators,
                }}
                onSubmit={(values, form) => {
                  const service = values['id']
                    ? updateProductById
                    : createProduct

                  service(values).then(() => {
                    form.restart()
                    form.reset()
                    form.change(
                      'unit_of_measure_products_attributes',
                      undefined,
                    )
                  })
                }}
                render={({ handleSubmit, submitting, form: { reset } }) => (
                  <form className="mb-8" onSubmit={handleSubmit}>
                    <h2 className="mb-4">Crear un producto</h2>
                    <div className="grid gap-4 grid-cols-6 mb-4">
                      <Input name="id" label="ID" parentClassName="hidden" />
                      <Input name="code" label={'Codigo'} />
                      <Input name="name" label={'Nombre del Producto'} />
                      <Input name="description" label={'Descripcion'} />
                      <Input
                        name="expiration_date"
                        label={'Fecha de vencimiento'}
                        type="date"
                      />
                      <Input
                        name="location"
                        label={'Ubicacion de Medicamento'}
                      />
                      <Input name="weight" label={'Peso'} type="number" />
                      <Input name="brand" label={'Marca del Producto'} />
                      <Input name="laboratory" label={'Laboratorio'} />
                      <Input name="component" label={'Componente'} />
                      <Input name="symptom" label={'Sintomas'} />
                      <Input name="igv_type" label={'Tipo de IGV'} />
                      <Input name="currency" label={'Moneda'} />
                      <Input
                        name="sale_price_inc_igv"
                        label={'Precio de venta (Inc. IGV)'}
                        type="number"
                      />
                      <Input
                        name="sale_price_ex_igv"
                        label={'Precio de venta (Sin IGV)'}
                        type="number"
                      />
                      <Input
                        name="unit_of_measure"
                        label={'Unidad de Medida'}
                      />
                      <Input
                        name="initial_stok"
                        label={'Stok inicial'}
                        type="number"
                      />
                      <Input
                        name="min_stok"
                        label={'Stok Minimo'}
                        type="number"
                      />
                      <Input
                        name="purchase_price"
                        label={'Precio Compra (Inc. IGV)'}
                        type="number"
                      />
                      <Input
                        name="profit_max"
                        label={'Ganacia Maxima'}
                        type="number"
                      />
                      <Input
                        name="profit_opt"
                        label={'Ganacia Optima'}
                        type="number"
                      />
                      <Input
                        name="icbper"
                        label={'¿Es Efecto al ICBPER?'}
                        type="checkbox"
                      />
                      <Input
                        name="multi_price"
                        label={'¿Utilizar multi precio?'}
                        type="checkbox"
                      />
                      <Input
                        name="digemid"
                        label={'Registro Digemid'}
                        type="checkbox"
                      />
                      <Input
                        name="batchRegister"
                        label={'Registro Lote'}
                        type="checkbox"
                      />
                    </div>
                    <FieldArray name="unit_of_measure_products_attributes">
                      {({ fields }) => (
                        <Accordion
                          className="mb-4"
                          expandIcon={<ExpandMoreIcon />}>
                          <AccordionSummary sx={{ backgroundColor: '#edf2f7' }}>
                            Presentaciones <ExpandMoreIcon />
                          </AccordionSummary>
                          <AccordionDetails>
                            <MaterialButton
                              onClick={() => fields.push()}
                              variant="contained"
                              endIcon={<AddIcon />}>
                              Agregar
                            </MaterialButton>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 800 }}>
                                    Nombre
                                  </TableCell>
                                  <TableCell sx={{ fontWeight: 800 }}>
                                    Unidad de medida
                                  </TableCell>
                                  <TableCell sx={{ fontWeight: 800 }}>
                                    Precio de venta
                                  </TableCell>
                                  <TableCell sx={{ fontWeight: 800 }}>
                                    Cantidad
                                  </TableCell>
                                  <TableCell sx={{ fontWeight: 800 }}>
                                    Eliminar
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {fields.value ? (
                                  fields.value
                                    .filter(item => !item?._destroy)
                                    .map((presentation, index) => (
                                      <TableRow key={index} className="flex">
                                        <TableCell>
                                          <Input
                                            name={`unit_of_measure_products_attributes[${index}].name`}
                                            validate={mix(
                                              required(),
                                              isAlphanumeric(),
                                            )}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <SelectField
                                            name={`unit_of_measure_products_attributes[${index}].unit_of_measure_id`}
                                            data={unitOfMeasureList}
                                            validate={mix(required())}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input
                                            type="number"
                                            name={`unit_of_measure_products_attributes[${index}].price`}
                                            validate={mix(
                                              required(),
                                              isNumber(),
                                            )}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input
                                            type="number"
                                            name={`unit_of_measure_products_attributes[${index}].quantity`}
                                            validate={mix(
                                              required(),
                                              isInteger(),
                                              lessThan(1),
                                            )}
                                          />
                                        </TableCell>
                                        <TableCell width={50}>
                                          <IconButton
                                            onClick={() => {
                                              fields.markForDestroy(index)
                                              //fields.remove(index)
                                            }}
                                            sx={{ padding: 0 }}>
                                            <RemoveCircle />
                                          </IconButton>
                                        </TableCell>
                                      </TableRow>
                                    ))
                                ) : (
                                  <></>
                                )}
                              </TableBody>
                            </Table>
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </FieldArray>
                    <Button type="submit" disabled={submitting}>
                      Crear producto
                    </Button>
                    <div className="overflow-x-auto ">
                      <Button
                        className="my-4"
                        onClick={() => generateProductsXLSX(productList)}>
                        Descargar listado de productos{' '}
                        <VerticalAlignBottomIcon />
                      </Button>
                      <Table className="mb-8" size="small">
                        <TableHead>
                          <TableRow
                            className="bg-blue-500"
                            onMouseUp={() => {}}>
                            <TableCell align="center">Codigo</TableCell>
                            <TableCell align="center" width={400}>
                              Nombre del Producto
                            </TableCell>
                            <TableCell align="center">Descripcion</TableCell>
                            <TableCell align="center">
                              Fecha de Vencimiento
                            </TableCell>
                            <TableCell align="center">
                              Ubicacion de Medicamento
                            </TableCell>
                            <TableCell align="center">Presentaciones</TableCell>
                            <TableCell align="center" width={100}>
                              Peso
                            </TableCell>
                            <TableCell align="center">
                              Marca del Producto
                            </TableCell>
                            <TableCell align="center">Laboratorio</TableCell>
                            <TableCell align="center">Componente</TableCell>
                            <TableCell align="center">Sintomas</TableCell>
                            <TableCell align="center">Tipo de IGV</TableCell>
                            <TableCell align="center">Moneda</TableCell>
                            <TableCell align="center">
                              Precio de venta (Inc. IGV)
                            </TableCell>
                            <TableCell align="center">
                              Precio de venta (Sin IGV)
                            </TableCell>
                            <TableCell align="center">
                              Unidad de Medida
                            </TableCell>
                            <TableCell align="center">Stock Inicial</TableCell>
                            <TableCell align="center">Stock Minimo</TableCell>
                            <TableCell align="center">
                              Precio Compra (Inc. IGV)
                            </TableCell>
                            <TableCell align="center">
                              Ganancia Maxima
                            </TableCell>
                            <TableCell align="center">
                              Ganancia Optima
                            </TableCell>
                            <TableCell align="center">
                              ¿Es Efecto al ICBPER?
                            </TableCell>
                            <TableCell align="center">
                              ¿Utilizar multi precio?
                            </TableCell>
                            <TableCell align="center">
                              Registro Digemid
                            </TableCell>
                            <TableCell align="center">Registro Lote</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {productList?.slice(0, 10)?.map((product, index) => {
                            return (
                              <TableRow className="flex" key={index}>
                                <TableCell>{product.code}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.expiration_date}</TableCell>
                                <TableCell>Holi</TableCell>
                                <TableCell>{product.location}</TableCell>
                                <TableCell>{product.weight}</TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell>{product.laboratory}</TableCell>
                                <TableCell>{product.component}</TableCell>
                                <TableCell>{product.symptom}</TableCell>
                                <TableCell>{product.igv_type}</TableCell>
                                <TableCell>{product.currency}</TableCell>
                                <TableCell>
                                  {product.sale_price_inc_igv}
                                </TableCell>
                                <TableCell>
                                  {product.sale_price_ex_igv}
                                </TableCell>
                                <TableCell>{product.unit_of_measure}</TableCell>
                                <TableCell>{product.initial_stock}</TableCell>
                                <TableCell>{product.min_stok}</TableCell>
                                <TableCell>{product.purchase_price}</TableCell>
                                <TableCell>{product.profit_max}</TableCell>
                                <TableCell>{product.profit_opt}</TableCell>
                                <TableCell>
                                  {product.icbper ? 'Es verdadero' : 'Es falso'}
                                </TableCell>
                                <TableCell>{product.multi_price}</TableCell>
                                <TableCell>{product.digemid}</TableCell>
                                <TableCell>{product.batch_register}</TableCell>
                                <TableCell>
                                  <IconButton
                                    onClick={() => {
                                      reset(product)
                                    }}
                                    sx={{ padding: 0 }}>
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => {
                                      deleteProductById(product.id)
                                    }}
                                    sx={{ padding: 0 }}>
                                    <DeleteIcon />
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
  )
}

export default Page
