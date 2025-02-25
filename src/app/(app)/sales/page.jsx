'use client'

import React, { useEffect, useState } from 'react'
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import useSales from '@/hooks/useSales'
import PictureAsPdf from '@mui/icons-material/PictureAsPdf'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { saleKindTransduction, saleStateTransduction } from '@/utils/helpers'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import CancelIcon from '@mui/icons-material/Cancel'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import SunatButton from '@/app/(app)/sales/components/SunatButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { generateInvoicePDF, generateInvoiceTicket } from '@/utils/pdf'
import AlertDialog from '@/components/AlertDialog'
import SendIcon from '@mui/icons-material/Send'
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom'
import { generateSalesXLSX } from '@/utils/xlsx'
import Button from '@/components/Button'
import Pagination from '@/components/Pagination'
import Loading from '@/app/Loading'

const Page = () => {
  const { saleList, isMutating, trigger, cancel } = useSales()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [selectedSale, setSelectedSale] = useState(null)

  useEffect(() => {
    trigger()
  }, [])

  if (isMutating) return <Loading />

  return (
    <>
      {selectedSale && (
        <AlertDialog
          handleClose={() => setSelectedSale(null)}
          handleAccept={async () => {
            await cancel(selectedSale.id).then(() => {
              trigger()
              setSelectedSale(null)
            })
          }}
          sale={selectedSale}
        />
      )}
      <div className="py-12">
        <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex gap-4">
                <Button
                  onClick={() => generateSalesXLSX(saleList)}
                  className="mb-4">
                  Descargar <VerticalAlignBottomIcon />
                </Button>
              </div>
              <Table size="small">
                <TableHead>
                  <TableRow className="bg-yellow-500">
                    <TableCell sx={{ fontWeight: 800 }}>Nº</TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>Serie</TableCell>
                    <TableCell sx={{ minWidth: 300, fontWeight: 800 }}>
                      Fecha
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>Cliente</TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>
                      Estado de pago
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>
                      Tipo de venta
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: 800 }} align="center">
                      Comprobante
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800 }} align="center">
                      Ticket
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800 }} align="center">
                      Estado SUNAT
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800 }} align="center">
                      Eliminar
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {saleList?.results
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                    .map((sale, index) => (
                      <TableRow
                        className="hover:bg-yellow-200 active:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300"
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': {
                            border: 0,
                          },
                        }}>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell component="th" scope="row">
                          {sale.invoice}
                        </TableCell>
                        <TableCell align="left">{sale.date}</TableCell>
                        <TableCell>{sale.customer?.document_number}</TableCell>
                        <TableCell>
                          {saleStateTransduction(sale.state)}
                        </TableCell>
                        <TableCell>{saleKindTransduction(sale.kind)}</TableCell>
                        <TableCell>S/. {sale.total}</TableCell>
                        <TableCell align="center">
                          <PictureAsPdf
                            onClick={() => generateInvoicePDF(sale)}
                            className="cursor-pointer"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <ReceiptIcon
                            onClick={() => generateInvoiceTicket(sale)}
                            className="cursor-pointer"
                          />
                        </TableCell>
                        <TableCell align="center">
                          {sale.sunat_data?.can_send ? (
                            <div>
                              <Tooltip
                                title={sale.sunat_data?.message}
                                placement="top">
                                {sale.sunat_data?.accepted ? (
                                  sale.sunat_data?.success ? (
                                    <CheckCircleIcon color="success" />
                                  ) : (
                                    <CancelIcon color="error" />
                                  )
                                ) : sale.sunat_data.sended ? (
                                  <SendIcon />
                                ) : (
                                  <ErrorIcon color="warning" />
                                )}
                              </Tooltip>
                              <div>
                                {!sale.sunat_data?.sended &&
                                  !sale.sunat_data?.success && (
                                    <SunatButton
                                      buttonText="Reintentar"
                                      saleId={sale.id}
                                      trigger={trigger}
                                    />
                                  )}
                                {sale.sunat_data?.sended && (
                                  <SunatButton
                                    buttonText="Consultar"
                                    saleId={sale.id}
                                    trigger={trigger}
                                    action={'query'}
                                  />
                                )}
                              </div>
                            </div>
                          ) : (
                            <RemoveCircleIcon color="disabled" />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            disabled={!sale.sunat_data?.can_destroy}
                            onClick={() => setSelectedSale(sale)}>
                            <DeleteForeverIcon
                              color={
                                sale.sunat_data?.can_destroy ? 'warning' : ''
                              }
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                  <Pagination
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    page={page}
                    setPage={setPage}
                    count={saleList?.results?.length}
                  />
                </TableFooter>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
