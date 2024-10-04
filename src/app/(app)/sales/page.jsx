'use client'

import React from 'react'
import Header from '@/app/(app)/Header'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import useSales from '@/hooks/useSales'

const Page = () => {
  const { saleList, isLoading } = useSales()
  const [hoveredRow, setHoveredRow] = React.useState(null)

  if (isLoading) return <div>Cargando prro...</div>

  return (
    <>
      <Header title="Scrum poker" />
      <div className="py-12">
        <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ minWidth: 300 }}>Nombre</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="right">Stock</TableCell>
                    <TableCell align="right">Lote</TableCell>
                    <TableCell align="right">F. V.</TableCell>
                    <TableCell align="right">Ubicacion</TableCell>
                    <TableCell align="right">Laboratorio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {saleList.map((product, index) => (
                    <TableRow
                      onClick={() => {
                        const foundProductIndex = fields.value?.findIndex(
                          _product => _product.product_id === product.id,
                        )
                        if (foundProductIndex >= 0) {
                          const foundProduct = fields.value[foundProductIndex]
                          fields.update(foundProductIndex, {
                            ...foundProduct,
                            quantity: foundProduct.quantity + 1,
                          })
                        } else {
                          const { id, ...rest } = product
                          fields.push({
                            quantity: 1,
                            product_id: product.id,
                            ...rest,
                          })
                        }
                      }}
                      className={
                        hoveredRow === index && 'bg-amber-400 cursor-pointer'
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
                      <TableCell align="right">{product.price}</TableCell>
                      <TableCell align="right">{product.stock}</TableCell>
                      <TableCell align="right">{product.lote}</TableCell>
                      <TableCell align="right">
                        {product.expiration_at}
                      </TableCell>
                      <TableCell align="right">{product.ubication}</TableCell>
                      <TableCell align="right">{product.Laboratory}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
