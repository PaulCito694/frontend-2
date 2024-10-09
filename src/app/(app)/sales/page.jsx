'use client'

import React from 'react'
import Header from '@/app/(app)/Header'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import useSales from '@/hooks/useSales'
import jsPDF from 'jspdf'
import PictureAsPdf from '@mui/icons-material/PictureAsPdf'

const Page = () => {
  const { saleList, isLoading } = useSales()
  const [hoveredRow, setHoveredRow] = React.useState(null)
  const doc = new jsPDF()

  if (isLoading) return <div>Cargando prro...</div>

  const handleClick = sale => {
    let paddingTop = 16
    let paddingDif = 6
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('SERVICIOS QHALIFARMA S.C.R.L', 60, paddingTop)
    paddingTop += paddingDif
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text('AV. ANTONIO RAIMONDI NRO. 864 HUANUCO', 60, paddingTop)
    paddingTop += paddingDif
    doc.text('LEONCIO PRADO - RUPA-RUPA', 60, paddingTop)
    paddingTop += paddingDif
    doc.setFontSize(9)
    doc.text('Telf.: 987045222', 60, paddingTop)
    paddingTop += paddingDif
    doc.text('Boticasqfsrl@gmail.com', 60, paddingTop)
    paddingTop += paddingDif
    doc.addImage('../logo-qhalifarma.png', 'PNG', 8, 8, 46, 46)
    doc.setFontSize(9)
    const docWidth = doc.internal.pageSize.getWidth()
    const docHeight = doc.internal.pageSize.getHeight()
    doc.line(150, 54, docWidth - 10, 54)
    doc.line(150, 8, docWidth - 10, 8) //vertical izquierda
    doc.line(150, 54, 150, 8)
    doc.line(docWidth - 10, 8, docWidth - 10, 54) //vertical derecha
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(12)
    doc.text('R.U.C. 20607482161', 155, 20)
    doc.text('BOLETA DE VENTA ', 155, 28)
    doc.text('ELECTRÓNICA', 155, 36)
    doc.text('B002 - 029992', 155, 44) // TODO: cambiar a valor de backend

    doc.text(`Cliente: ${sale.customer?.name || '-'}`, 8, 60)
    doc.text(`D.N.I.: ${sale.customer?.document_number || '-'}`, 8, 66)
    doc.text(`Dirección: ${sale.customer?.address || '-'}`, 8, 72)
    doc.text('Forma de Pago: CONTADO', 8, 78)

    doc.rect(8, 84, docWidth - 18, 16)
    doc.rect(8, 84, docWidth - 18, 5)
    doc.line(docWidth / 5, 84, docWidth / 5, 100)
    doc.line((docWidth / 5) * 2, 84, (docWidth / 5) * 2, 100)
    doc.line((docWidth / 5) * 3, 84, (docWidth / 5) * 3, 100)
    doc.line((docWidth / 5) * 4, 84, (docWidth / 5) * 4, 100)
    doc.setFontSize(9)
    doc.text('FECHA DE EMISIÓN', 10, 88)
    doc.text('FECHA VENCIMIENTO', 45, 88)
    doc.text('CONDICIÓN DE PAGO', 88, 88)
    doc.text('TIPO DE MONEDA', 133, 88)
    doc.text('NÚMERO DE GUÍA', 170, 88)
    doc.setFontSize(8)
    doc.text(sale.date, 16, 95)
    doc.text(sale.date, 54, 95)
    doc.text('Al contado', 98, 95)
    doc.text('Soles', 143, 95)

    doc.setFontSize(10)
    doc.rect(8, 105, docWidth - 18, 8)
    doc.line(22, 105, 22, 113)
    doc.line(40, 105, 40, 113)
    doc.line(60, 105, 60, 113)
    doc.line(120, 105, 120, 113)
    doc.line(140, 105, 140, 113)
    doc.line(160, 105, 160, 113)
    doc.line(180, 105, 180, 113)
    doc.text('Cant.', 11, 110)
    doc.text('U.M.', 25, 110)
    doc.text('Lab.', 45, 110)
    doc.text('DESCRIPCIÓN', 80, 110)
    doc.text('F. Vto.', 125, 110)
    doc.text('Lote', 145, 110)
    doc.text('P.U.', 165, 110)
    doc.text('IMPORTE', 182, 110)
    let startSaleDetailX = 14
    let startSaleDetailY = 118
    let partialY = 0
    const YDif = 6
    sale.sale_details?.map((sale_detail, index) => {
      partialY = startSaleDetailY + index * YDif
      doc.text(sale_detail.quantity?.toString() || ' - ', 10, partialY)
      doc.text(
        sale_detail.product.unit_of_measure?.toString() || ' - ',
        24,
        partialY,
      )
      doc.text(
        sale_detail.product.labaratory?.toString() || ' - ',
        42,
        partialY,
      )
      doc.text(sale_detail.product.name?.toString() || ' - ', 62, partialY)
      doc.text(
        sale_detail.product.expiration_date?.toString() || ' - ',
        120,
        partialY,
      )
      doc.text(' - ', 142, partialY)
      doc.text(sale_detail.price?.toString() || ' - ', 162, partialY)
      doc.text(sale_detail.sub_total?.toString() || ' - ', 182, partialY)
      doc.rect(8, partialY - 5, docWidth - 18, 6)
    })
    doc.addImage('../qr.png', 'PNG', 8, partialY + 8, 40, 40)
    doc.text(
      `Observaciones: ${sale.observations?.toString() || ' - '}`,
      50,
      partialY + 12,
    )
    doc.text(
      `Vendedor(a): ${sale.employee?.name?.toString() || ' - '}`,
      50,
      partialY + 18,
    )
    doc.text('Resumen', 125, partialY + 12)
    doc.text('Gravada:', 125, partialY + 18)
    doc.text('Exonerado:', 125, partialY + 24)
    doc.text('Total:', 125, partialY + 30)
    doc.text('IGV (18.00%):', 125, partialY + 36)
    doc.text('Descuento Total:', 125, partialY + 42)
    doc.text('Recibido:', 125, partialY + 48)
    doc.text('Vuelto:', 125, partialY + 54)
    doc.text('Total:', 125, partialY + 60)

    doc.text('S/. 0.00:', 160, partialY + 18)
    doc.text(`S/. ${sale.total || '0.00'}:`, 160, partialY + 24)
    doc.text(`S/. ${sale.total || '0.00'}:`, 160, partialY + 30)
    doc.text('S/. 0.00:', 160, partialY + 36)
    doc.text('S/. 0.00:', 160, partialY + 42)
    doc.text('Recibido:', 160, partialY + 48)
    doc.text('Vuelto:', 160, partialY + 54)
    doc.text(`S/. ${sale.total || '0.00'}:`, 160, partialY + 60)

    doc.output('pdfobjectnewwindow')
    //doc.save('two-by-four.pdf')
  }

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
                    <TableCell sx={{ minWidth: 300 }}>Fecha</TableCell>
                    <TableCell>Comprobante</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>PDF</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {saleList.map((sale, index) => (
                    <TableRow
                      className={hoveredRow === index && 'bg-amber-400'}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': {
                          border: 0,
                        },
                      }}>
                      <TableCell align="left">{sale.date}</TableCell>
                      <TableCell component="th" scope="row">
                        {sale.invoice}
                      </TableCell>
                      <TableCell>{sale.customer?.document_number}</TableCell>
                      <TableCell>S/. {sale.total}</TableCell>
                      <TableCell>
                        <PictureAsPdf
                          onClick={() => handleClick(sale)}
                          className="cursor-pointer"
                        />
                      </TableCell>
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
