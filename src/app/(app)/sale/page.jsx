'use client'

import React from 'react'
import Header from '@/app/(app)/Header'
import { Form } from 'react-final-form'
import Button from '@/components/Button'
import { clearMutator } from 'utils/mutators'
import { Card, CardContent } from '@mui/material'
import Link from 'next/link'
import Input from '@/components/Input'
import useProducts from '@/hooks/useProducts'
require('../echo')

const Page = () => {
  const { productList, isLoading, createProduct } = useProducts()

  if (isLoading) return <div>Cargando prro...</div>

  return (
    <>
      <Header title="Scrum poker" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div>
                <p>Productos</p>
                <div className="grid gap-2 grid-cols-4">
                  {productList?.map((product, index) => (
                    <div key={index}>
                      <Link href={`product/${product.id}`}>
                        <Card>
                          <CardContent>{product.name}</CardContent>
                        </Card>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <Form
                mutators={{ clear: clearMutator }}
                onSubmit={values => createProduct(values)}
                render={({ handleSubmit, submitting }) => (
                  <form onSubmit={handleSubmit}>
                    <h2>Crear una nueva sala:</h2>
                    <div>
                      <Input name="name" label={'Nombre'}></Input>
                      <Input name="description" label={'Descripcion'}></Input>
                    </div>
                    <Button type="submit" disabled={submitting}>
                      Crear producto
                    </Button>
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
