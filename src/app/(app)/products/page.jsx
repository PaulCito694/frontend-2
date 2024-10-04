'use client'

import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Button from '@/components/Button'
import useProduct from '@/hooks/useProducts'
import { Form } from 'react-final-form'
import Input from '@/components/Input'

require('../echo')

const Page = () => {
  
const {productList,createProduct} = useProduct()  

console.log(productList)

  return (
    <div>
      {productList?.map((_message, index) => {
        console.log("**************",_message.icbper)
        return <div key={index}>{_message.name} - {_message.code} - {_message.expirationDate} - {_message.location} -{_message.weight}-{_message.brand}-{_message.labaratory}-{_message.component}-{_message.symptom}-{_message.igvType}-{_message.currency}-{_message.salePriceIncIGV}-{_message.salePriceExIGV}
        -{_message.unitOfMeasure}-{_message.initialStok}-{_message.minStok}-{_message.purchasePrice}-{_message.profitMax}-{_message.profitOpt}-{_message.icbper ? 'Es verdadero' : 'Es falso'}-{_message.multiPrice}-{_message.digemid}-{_message.batchRegister}</div>
      })}

      <Form
                //mutators={{ clear: clearMutator }}
                onSubmit={values => createProduct(values)}
                render={({ handleSubmit, submitting }) => (
                  <form onSubmit={handleSubmit}>
                    <h2>Crear un producto</h2>
                    <div>
                      <Input name="code" label={'Codigo'}></Input>
                      <Input name="name" label={'Nombre del Producto'}></Input>
                      <Input name="description" label={'Descripcion'}></Input>
                      <Input name="expirationDate" label={'Fecha de vencimiento'} type="date"></Input>
                      <Input name="location" label={'Ubicacion de Medicamento'}></Input>
                      <Input name="weight" label={'Peso'} type="number"></Input>
                      <Input name="brand" label={'Marca del Producto'}></Input>
                      <Input name="labaratory" label={'Laboratorio'}></Input>
                      <Input name="component" label={'Componente'}></Input>
                      <Input name="symptom" label={'Sintomas'}></Input>
                      <Input name="igvType" label={'Tipo de IGV'}></Input>
                      <Input name="currency" label={'Moneda'}></Input>
                      <Input name="salePriceIncIGV" label={'Precio de venta (Inc. IGV)'} type="number"></Input>
                      <Input name="salePriceExIGV" label={'Precio de venta (Sin IGV)'} type="number"></Input>
                      <Input name="unitOfMeasure" label={'Unidad de Medida'}></Input>
                      <Input name="initialStok" label={'Stok inicial'} type="number"></Input>
                      <Input name="minStok" label={'Stok Minimo'} type="number"></Input>
                      <Input name="purchasePrice" label={'Precio Compra (Inc. IGV)'} type="number"></Input>
                      <Input name="profitMax" label={'Ganacia Maxima'} type="number"></Input>
                      <Input name="profitOpt" label={'Ganacia Optima'} type="number"></Input>
                      <Input name="icbper" label={'¿Es Efecto al ICBPER?'} type="checkbox"></Input>
                      <Input name="multiPrice" label={'¿Utilizar multi precio?'} type="checkbox"></Input>
                      <Input name="digemid" label={'Registro Digemid'} type="checkbox"></Input>
                      <Input name="batchRegister" label={'Registro Lote'} type="checkbox"></Input>
                    </div>
                    <Button type="submit" disabled={submitting}>
                      Crear producto
                    </Button>
                  </form>
                )}
      />
    </div>
  )
}

export default Page