import jsPDF from 'jspdf'
import { numberToLetters } from '@/utils/number_to_letters'

export const generateInvoicePDF = sale => {
  const doc = new jsPDF()
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
  doc.line(150, 54, docWidth - 10, 54)
  doc.line(150, 8, docWidth - 10, 8) //vertical izquierda
  doc.line(150, 54, 150, 8)
  doc.line(docWidth - 10, 8, docWidth - 10, 54) //vertical derecha
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(12)
  doc.text('R.U.C. 20607482161', 155, 20)
  doc.text('BOLETA DE VENTA ', 155, 28)
  doc.text('ELECTRÓNICA', 155, 36)
  doc.text(sale.invoice.toString() || ' - ', 155, 44) // TODO: cambiar a valor de backend

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
    doc.text(sale_detail.product.labaratory?.toString() || ' - ', 42, partialY)
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

export const generateInvoiceTicket = sale => {
  const totalHeight = 140 + sale.sale_details.length * 5
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: [80, totalHeight],
  })
  doc.setFontSize(8)
  doc.text('SERVICIOS QHALIFARMA S.C.R.L', 40, 5, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.text('AV. ANTONIO RAIMONDI NRO. 864 HUANUCO', 40, 10, {
    align: 'center',
  })
  doc.text('LEONCIO PRADO - RUPA-RUPA', 40, 15, { align: 'center' })
  doc.setFontSize(7)
  doc.text('Telf.: 987045222', 40, 20, { align: 'center' })
  doc.text('Boticasqfsrl@gmail.com', 40, 25, { align: 'center' })
  doc.line(2, 27, 78, 27, 'DF')

  doc.setFontSize(8)
  doc.text('BOLETA ELECTRÓNICA', 40, 30, { align: 'center' })
  doc.text(sale.invoice?.toString() || '', 40, 35, { align: 'center' })
  doc.text(`Fecha de Emisión: ${sale.date}`, 2, 40)
  doc.text(`Señor (es): ${sale.customer?.name}`, 2, 45)
  doc.text(`D.N.I.: ${sale.customer?.dni}`, 2, 50)
  doc.text(`Direc.: ${sale.customer?.address || '-'}`, 2, 55)
  doc.text(`Forma de Pago: Contado`, 2, 60)
  doc.line(2, 62, 78, 62, 'DF')
  doc.text(`Cant.`, 2, 65)
  doc.text(`Descripción`, 10, 65)
  doc.text(`P.U.`, 58, 65)
  doc.text(`Importe`, 68, 65)
  doc.line(2, 67, 78, 67, 'DF')
  let startSaleDetailY = 70
  let partialY = 0
  const YDif = 4
  sale.sale_details.map((sale_detail, index) => {
    partialY = startSaleDetailY + index * YDif
    doc.text(sale_detail.quantity?.toString() || ' - ', 2, partialY)
    doc.text(sale_detail.product.name?.toString() || ' - ', 10, partialY)
    doc.text(sale_detail.price?.toString() || ' - ', 58, partialY)
    doc.text(sale_detail.sub_total?.toString() || ' - ', 68, partialY)
  })
  doc.line(2, partialY + 2, 78, partialY + 2)
  doc.setFontSize(9)
  doc.text(`Exonerado:`, 61, partialY + 5, { align: 'right' })
  doc.text(`Total a Pagar:`, 61, partialY + 10, { align: 'right' })
  doc.text(`Recibido:`, 61, partialY + 15, { align: 'right' })
  doc.text(`Vuelto:`, 61, partialY + 20, { align: 'right' })
  doc.text(`S/. ${sale.total?.toString()}` || '-', 64, partialY + 5)
  doc.text(`S/. ${sale.total?.toString()}` || '-', 64, partialY + 10)
  doc.text(`S/. ${sale.received_amount?.toString() || '-'}`, 64, partialY + 15)
  doc.text(`S/. ${sale.change_amount?.toString() || '-'}`, 64, partialY + 20)
  doc.line(2, partialY + 22, 78, partialY + 22)
  doc.setFontSize(7)
  doc.text(numberToLetters(sale.total)?.toString(), 2, partialY + 25)
  doc.addImage('../qr.png', 'PNG', 20, partialY + 27, 40, 40)
  doc.line(2, partialY + 69, 78, partialY + 69)
  doc.output('pdfobjectnewwindow')
}
