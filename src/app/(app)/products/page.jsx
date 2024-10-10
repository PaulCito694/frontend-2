'use client'

import React from 'react'
import Button from '@/components/Button'
import useProduct from '@/hooks/useProducts'
import { Form } from 'react-final-form'
import Input from '@/components/Input'
import Header from '@/app/(app)/Header'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

const Page = () => {
  const { productList, isLoading, createProduct } = useProduct()

  if (isLoading) return <div>Cargando prro...</div>

  return (
    <div>
      <Header title="Productos" />
      <div className="py-12">
        <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <Form
                //mutators={{ clear: clearMutator }}
                onSubmit={values => createProduct(values)}
                render={({ handleSubmit, submitting }) => (
                  <form className="mb-8" onSubmit={handleSubmit}>
                    <h2 className="mb-4">Crear un producto</h2>
                    <div className="grid gap-4 grid-cols-6 mb-4">
                      <Input name="code" label={'Codigo'} />
                      <Input name="name" label={'Nombre del Producto'} />
                      <Input name="description" label={'Descripcion'} />
                      <Input
                        name="expirationDate"
                        label={'Fecha de vencimiento'}
                        type="date"
                      />
                      <Input
                        name="location"
                        label={'Ubicacion de Medicamento'}
                      />
                      <Input name="weight" label={'Peso'} type="number" />
                      <Input name="brand" label={'Marca del Producto'} />
                      <Input name="labaratory" label={'Laboratorio'} />
                      <Input name="component" label={'Componente'} />
                      <Input name="symptom" label={'Sintomas'} />
                      <Input name="igvType" label={'Tipo de IGV'} />
                      <Input name="currency" label={'Moneda'} />
                      <Input
                        name="salePriceIncIGV"
                        label={'Precio de venta (Inc. IGV)'}
                        type="number"
                      />
                      <Input
                        name="salePriceExIGV"
                        label={'Precio de venta (Sin IGV)'}
                        type="number"
                      />
                      <Input name="unitOfMeasure" label={'Unidad de Medida'} />
                      <Input
                        name="initialStok"
                        label={'Stok inicial'}
                        type="number"
                      />
                      <Input
                        name="minStok"
                        label={'Stok Minimo'}
                        type="number"
                      />
                      <Input
                        name="purchasePrice"
                        label={'Precio Compra (Inc. IGV)'}
                        type="number"
                      />
                      <Input
                        name="profitMax"
                        label={'Ganacia Maxima'}
                        type="number"
                      />
                      <Input
                        name="profitOpt"
                        label={'Ganacia Optima'}
                        type="number"
                      />
                      <Input
                        name="icbper"
                        label={'¿Es Efecto al ICBPER?'}
                        type="checkbox"
                      />
                      <Input
                        name="multiPrice"
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
                    <Button type="submit" disabled={submitting}>
                      Crear producto
                    </Button>
                  </form>
                )}
              />
              <Table className="mb-8" size="small">
                <TableHead>
                  <TableRow className="bg-blue-500" onMouseUp={() => {}}>
                    <TableCell align="center" width={8}>
                      Codigo
                    </TableCell>
                    <TableCell align="center" width={400}>
                      Nombre del Producto
                    </TableCell>
                    <TableCell align="center">
                      Descripcion
                    </TableCell>
                    <TableCell align="center">
                      Fecha de Vencimiento
                    </TableCell>
                    <TableCell align="center">
                      Ubicacion de Medicamento
                    </TableCell>
                    <TableCell align="center" width={100}>
                      Peso
                    </TableCell>
                    <TableCell align="center">
                      Marca del Producto
                    </TableCell>
                    <TableCell align="center">
                      Laboratorio
                    </TableCell>
                    <TableCell align="center">
                      Componente
                    </TableCell>
                    <TableCell align="center">
                      Sintomas
                    </TableCell>
                    <TableCell align="center">
                      Tipo de IGV
                    </TableCell>
                    <TableCell align="center">
                      Moneda
                    </TableCell>
                    <TableCell align="center">
                      Precio de venta (Inc. IGV)
                    </TableCell>
                    <TableCell align="center">
                      Precio de venta (Sin IGV)
                    </TableCell>
                    <TableCell align="center">
                      Unidad de Medida
                    </TableCell>
                    <TableCell align="center">
                      Stock Inicial
                    </TableCell>
                    <TableCell align="center">
                      Stock Minimo
                    </TableCell>
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
                    <TableCell align="center">
                      Registro Lote
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productList?.map((_message, index) => {
                    return (
                      <TableRow className="flex" key={index}>
                        <TableCell>{_message.code}</TableCell>
                        <TableCell>{_message.name}</TableCell>
                        <TableCell>{_message.description}</TableCell>
                        <TableCell>{_message.expirationDate}</TableCell>
                        <TableCell>{_message.location}</TableCell>
                        <TableCell>{_message.weight}</TableCell>
                        <TableCell>{_message.brand}</TableCell>
                        <TableCell>{_message.labaratory}</TableCell>
                        <TableCell>{_message.component}</TableCell>
                        <TableCell>{_message.symptom}</TableCell>
                        <TableCell>{_message.igvType}</TableCell>
                        <TableCell>{_message.currency}</TableCell>
                        <TableCell>{_message.salePriceIncIGV}</TableCell>
                        <TableCell>{_message.salePriceExIGV}</TableCell>
                        <TableCell>{_message.unitOfMeasure}</TableCell>
                        <TableCell>{_message.initialStok}</TableCell>
                        <TableCell>{_message.minStok}</TableCell>
                        <TableCell>{_message.purchasePrice}</TableCell>
                        <TableCell>{_message.profitMax}</TableCell>
                        <TableCell>{_message.profitOpt}</TableCell>
                        <TableCell>{_message.icbper ? 'Es verdadero' : 'Es falso'}</TableCell>
                        <TableCell>{_message.multiPrice}</TableCell>
                        <TableCell>{_message.digemid}</TableCell>
                        <TableCell>{_message.batchRegister}</TableCell>

                        {/*TODO: Acabar esta tabla*/}
                        {/*{_message.name} - {_message.code} -{' '}
                        {_message.expirationDate} - {_message.location} -
                        {_message.weight}-{_message.brand}-{_message.labaratory}-
                        {_message.component}-{_message.symptom}-{_message.igvType}-
                        {_message.currency}-{_message.salePriceIncIGV}-
                        {_message.salePriceExIGV}-{_message.unitOfMeasure}-
                        {_message.initialStok}-{_message.minStok}-
                        {_message.purchasePrice}-{_message.profitMax}-
                        {_message.profitOpt}-
                        {_message.icbper ? 'Es verdadero' : 'Es falso'}-
                        {_message.multiPrice}-{_message.digemid}-
                        {_message.batchRegister}*/}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
