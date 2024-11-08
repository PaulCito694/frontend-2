import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Input from '@/components/Input'
import Pagination from '@/components/Pagination'

const ProductsTable = ({ productList, fields }) => {
  const [searchNameOrComponent, setSearchNameOrComponent] = useState('')
  const [searchBarCode, setSearchBarCode] = useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(50)
  const [filteredProducts, setFilteredProducts] = useState(
    productList.slice(0, 10),
  )

  useEffect(() => {
    if (searchNameOrComponent?.trim()?.length > 0)
      setFilteredProducts(
        productList
          ?.filter(
            product =>
              product.name?.toUpperCase()?.includes(searchNameOrComponent) ||
              product.component?.toUpperCase()?.includes(searchNameOrComponent),
          )
          .slice(0, rowsPerPage),
      )
  }, [searchNameOrComponent])

  useEffect(() => {
    if (searchBarCode?.trim()?.length > 0)
      setFilteredProducts(
        productList
          ?.filter(product =>
            product.code?.toUpperCase()?.includes(searchBarCode),
          )
          .slice(0, rowsPerPage),
      )
  }, [searchBarCode])

  useEffect(() => {
    setFilteredProducts(productList.slice(0, 10))
  }, [productList])

  const handleTableRowClick = product => {
    const foundProductIndex = fields.value?.findIndex(
      _product => _product.product_id === product.id,
    )
    if (foundProductIndex >= 0) {
      const foundProduct = fields.value[foundProductIndex]
      fields.update(foundProductIndex, {
        ...foundProduct,
        quantity: Number(foundProduct.quantity) + 1,
      })
    } else {
      const { id, ...rest } = product // eslint-disable-line no-unused-vars
      fields.push({
        quantity: 1,
        product_id: product.id,
        price: product.sale_price_inc_igv,
        initial_price: product.sale_price_inc_igv,
        last_price: product.sale_price_inc_igv,
        last_stock: product.stock_quantity + 1,
        composed_name: `${product.name} (${product.lote || ' - '})`,
        unit_of_measure_product_value: 'unit',
        sub_total: 1 * product.sale_price_inc_igv,
        ...rest,
      })
    }
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl mb-4">Listado de productos:</h2>
      <div className="flex justify-between gap-4">
        <Input
          name="codeSearch"
          label="Buscar por nombre o componente"
          onChange={setSearchNameOrComponent}
          parentClassName="mb-4 w-full"
        />
        <Input
          name="nameSearch"
          label="Buscar por codigo de barras"
          onChange={setSearchBarCode}
          parentClassName="mb-4 w-full"
        />
      </div>
      <Card>
        <Table size="small">
          <TableHead>
            <TableRow className="bg-violet-500">
              <TableCell sx={{ width: 350, fontWeight: 800 }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 800 }} align="right">
                Precio
              </TableCell>
              <TableCell sx={{ fontWeight: 800 }} align="right">
                Stock
              </TableCell>
              <TableCell sx={{ fontWeight: 800 }} align="right">
                Lote
              </TableCell>
              <TableCell sx={{ fontWeight: 800 }} align="right">
                Componente
              </TableCell>
              <TableCell sx={{ fontWeight: 800 }} align="right">
                F. V.
              </TableCell>
              <TableCell sx={{ fontWeight: 800 }} align="right">
                Ubicacion
              </TableCell>
              <TableCell sx={{ fontWeight: 800 }} align="right">
                Laboratorio
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts?.map((product, index) => (
              <TableRow
                onClick={() => handleTableRowClick(product)}
                className="hover:bg-violet-200 active:bg-violet-300 focus:outline-none focus:ring focus:ring-violet-300 cursor-pointer"
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0,
                  },
                }}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sale_price_inc_igv}</TableCell>
                <TableCell>{product.stock_quantity}</TableCell>
                <TableCell>{product.batch_register}</TableCell>
                <TableCell>{product.component}</TableCell>
                <TableCell>{product.expiration_date}</TableCell>
                <TableCell>{product.location}</TableCell>
                <TableCell>{product.laboratory}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <Pagination
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              page={page}
              setPage={setPage}
              count={productList.length}
            />
          </TableFooter>
        </Table>
      </Card>
    </div>
  )
}

export default ProductsTable
