import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
} from '@mui/material'
import { useState } from 'react'
import Button from '@/components/Button'

const AlertDialog = ({ handleClose, handleAccept, sale }) => {
  const [loading, setLoading] = useState(false)
  return (
    <Dialog
      open
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        Seguro que desea eliminar esta venta con un total de{' '}
        <span className="font-medium">S/.{sale.total}</span>?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Esta accion implica lo siguiente la eliminacion permanente del listado
          de ventas, devolucion al stock de los productos vendidos en este
          documento y Si el documento fue enviado a la SUNAT, se emitira su
          cancelacion. Los productos devueltos seran:
          <List dense="dense">
            <ListItem className="flex gap-4 justify-between">
              <div>Producto</div>
              <div>Cantidad</div>{' '}
            </ListItem>
            {sale.sale_details.map((sale_detail, index) => (
              <ListItem key={index} className="flex gap-4 justify-between">
                <div>{sale_detail.product?.name}</div>
                <div>{sale_detail.quantity}</div>{' '}
              </ListItem>
            ))}
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Atras</Button>
        <Button
          onClick={() => {
            setLoading(true)
            handleAccept().finally(() => setLoading(false))
          }}
          loading={loading}
          autoFocus>
          Eliminar venta
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog
