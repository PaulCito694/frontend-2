import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React from 'react'
import ProductsTable from '@/components/ProductsTable'
import Search from '@mui/icons-material/Search'

const ProductsDialog = ({ productList, fields }) => {
  return (
    <>
      <Accordion style={{ backgroundColor: '#c4b5fd', marginBottom: '1rem' }}>
        <AccordionSummary>
          Buscar productos <Search />
        </AccordionSummary>
        <AccordionDetails>
          <ProductsTable productList={productList} fields={fields} />
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default ProductsDialog
