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
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [filteredProducts, setFilteredProducts] = useState(
    productList.slice(0, 10),
  )

  useEffect(() => {
    const searchTextLower = searchText.toLowerCase()
    setFilteredProducts(
      productList
        ?.filter(product =>
          product.name?.toLowerCase()?.includes(searchTextLower),
        )
        .slice(0, rowsPerPage),
    )
  }, [searchText])

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
        composed_name: `${product.name} (${product.lote || ' - '})`,
        sub_total: 1 * product.sale_price_inc_igv,
        ...rest,
      })
    }
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl mb-4">Listado de productos:</h2>
      <Input
        name="search"
        label="Buscar"
        onChange={setSearchText}
        parentClassName="mb-4"
      />
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
