import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import Button from '@/components/Button'

const ShowProductsDialog = ({ handleClose, purchase }) => {
  return (
    <Dialog
      open
      maxWidth="lg"
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        Productos actualizados en el registro {purchase.id}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>
                  Nombre de producto
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Anterior stock</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Nuevo stock</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Anterior precio</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Nuevo precio</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Ubicacion</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>
                  Fecha de expiracion
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchase.purchase_details.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>{product.initial_stock}</TableCell>
                  <TableCell>{product.last_stock}</TableCell>
                  <TableCell>{product.initial_price}</TableCell>
                  <TableCell>{product.last_price}</TableCell>
                  <TableCell>{product.location}</TableCell>
                  <TableCell>{product.expiration_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Atras</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ShowProductsDialog
