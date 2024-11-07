import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import React from 'react'
import Button from '@/components/Button'
import ProductsTable from '@/components/ProductsTable'

const ProductsDialog = ({ handleClose, productList, fields }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        Seleccione los productos que desee ingresar a la venta
      </DialogTitle>
      <DialogContent>
        <ProductsTable productList={productList} fields={fields} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductsDialog
