'use client'

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import useSales from '@/hooks/useSales'
import jsPDF from 'jspdf'
import PictureAsPdf from '@mui/icons-material/PictureAsPdf'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { numberToLetters } from '@/utils/number_to_letters'
import { Form } from 'react-final-form'
import DatePickerField from '@/components/DatePickerField'
import SelectField from '@/components/SelectField'
import moment from 'moment'
import Button from '@/components/Button'
import { saleKindTransduction, saleStateTransduction } from '@/utils/helpers'
import { mix, required } from '@/utils/validations'

const Page = () => {
  const { saleList, trigger } = useSales()

  const generateInvoiceTicket = sale => {
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
    doc.text(`Señor (es): ${sale.date}`, 2, 45)
    doc.text(`D.N.I.: ${sale.date}`, 2, 50)
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
    doc.text(
      `S/. ${sale.received_amount?.toString() || '-'}`,
      64,
      partialY + 15,
    )
    doc.text(`S/. ${sale.change_amount?.toString() || '-'}`, 64, partialY + 20)
    doc.line(2, partialY + 22, 78, partialY + 22)
    doc.setFontSize(7)
    doc.text(numberToLetters(sale.total)?.toString(), 2, partialY + 25)
    doc.addImage('../qr.png', 'PNG', 20, partialY + 27, 40, 40)
    doc.line(2, partialY + 69, 78, partialY + 69)
    doc.output('pdfobjectnewwindow')
  }

  const generateSalesResumeTicket = () => {
    const totalHeight = 120 + saleList?.resume?.total_sale_details * 5
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: [80, totalHeight],
    })
    doc.setFontSize(8)
    doc.text('SERVICIOS QHALIFARMA S.C.R.L', 40, 5, { align: 'center' })
    doc.text('Resumen de caja chica', 40, 10, { align: 'center' })
    doc.text(
      `Trabajador(a): ${saleList?.resume?.employee?.first_name} ${saleList?.resume?.employee?.last_name}`,
      2,
      15,
    )
    doc.text(
      `Fechas: Desde ${saleList?.resume?.from} hasta ${saleList?.resume?.to}`,
      2,
      20,
    )
    doc.text(`Total: S/. ${saleList?.resume?.sum_total || 0}`, 2, 25)
    doc.setFontSize(9)
    doc.text('Reporte de ventas', 40, 30, { align: 'center' })
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text('Nro.', 2, 35)
    doc.text('Producto', 14, 35)
    doc.text('Cantidad', 42, 35)
    doc.text('P. Unit', 58, 35)
    doc.text('Total', 70, 35)

    doc.setFont('helvetica', 'normal')

    let startSaleDetailY = 40
    let partialY = startSaleDetailY
    const YDif = 4
    let count = 1
    saleList?.results?.forEach(sale => {
      sale.sale_details.forEach(saleDetail => {
        const splitText = doc.splitTextToSize(
          saleDetail.product?.name?.toString() || '',
          30,
        )
        doc.text(count.toString(), 2, partialY)
        doc.text(10, partialY, splitText)
        doc.text(saleDetail.quantity?.toString() || '', 42, partialY)
        doc.text(saleDetail.price?.toString() || '', 58, partialY)
        doc.text(saleDetail.sub_total?.toString() || '', 70, partialY)
        partialY = partialY + splitText.length * YDif
        count += 1
      })
    })

    doc.output('pdfobjectnewwindow')
  }

  return (
    <>
      <div className="pt-12">
        <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <Form
                onSubmit={values => {
                  trigger(
                    `date_lteq=${moment(values.to).format(
                      'YYYY-MM-DD',
                    )}&date_gteq=${moment(values.from).format(
                      'YYYY-MM-DD',
                    )}&employee_id_eq=${values.employee_id}`,
                  )
                }}
                render={({ handleSubmit, submitting }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="flex justify-start gap-4">
                    <SelectField
                      className="w-56"
                      name="employee_id"
                      label="Empleado"
                      data={[
                        {
                          id: 1,
                          name: 'Liliana', //TODO: jalar de users
                        },
                      ]}
                      validate={mix(required())}
                    />
                    <DatePickerField name="from" label="Desde" />
                    <DatePickerField name="to" label="Hasta" />
                    <Button type="submit" disabled={submitting}>
                      Buscar
                    </Button>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-12">
        <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200 flex gap-4 items-start">
              <div>
                <div className="flex flex-col text-lg gap-4 justify-start">
                  <div className="flex">
                    <h3 className=" mr-2">Ventas de: </h3>
                    <span className="font-bold">
                      {saleList?.resume?.employee?.first_name}{' '}
                      {saleList?.resume?.employee?.last_name}
                    </span>
                  </div>
                  <div className="flex">
                    <h3 className=" mr-2">Fechas: </h3>
                    Desde el{' '}
                    <span className="font-bold mx-2">
                      {saleList?.resume?.from}
                    </span>{' '}
                    hasta al{' '}
                    <span className="font-bold mx-2">
                      {saleList?.resume?.to}
                    </span>
                  </div>
                </div>
                <Table size="small" className="mb-8">
                  <TableHead>
                    <TableRow className="bg-yellow-500">
                      <TableCell sx={{ minWidth: 300, fontWeight: 800 }}>
                        Fecha
                      </TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>
                        Comprobante
                      </TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Cliente</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>
                        Estado de pago
                      </TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>
                        Tipo de venta
                      </TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Total</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>
                        Comprobante
                      </TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Ticket</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {saleList?.results?.map((sale, index) => (
                      <TableRow
                        className="hover:bg-yellow-200 active:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300"
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
                        <TableCell>
                          {saleStateTransduction(sale.state)}
                        </TableCell>
                        <TableCell>{saleKindTransduction(sale.kind)}</TableCell>
                        <TableCell>S/. {sale.total}</TableCell>
                        <TableCell>
                          <PictureAsPdf className="cursor-pointer" />
                        </TableCell>
                        <TableCell>
                          <ReceiptIcon
                            onClick={() => generateInvoiceTicket(sale)}
                            className="cursor-pointer"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex flex-col gap-4">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ fontWeight: 800 }}
                        colSpan={2}
                        align="center">
                        Notas de venta
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 800 }}
                        colSpan={2}
                        align="center">
                        Boletas
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 800 }}
                        colSpan={2}
                        align="center">
                        Facturas
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 800 }}
                        colSpan={2}
                        align="center">
                        Total ventas
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">Conteo</TableCell>
                      <TableCell align="center">Total</TableCell>
                      <TableCell align="center">Conteo</TableCell>
                      <TableCell align="center">Total</TableCell>
                      <TableCell align="center">Conteo</TableCell>
                      <TableCell align="center">Total</TableCell>
                      <TableCell align="center">Conteo</TableCell>
                      <TableCell align="center">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        {saleList?.resume?.count?.sales_note || 0}
                      </TableCell>
                      <TableCell align="center">
                        {saleList?.resume?.total?.sales_note || 0}
                      </TableCell>
                      <TableCell align="center">
                        {saleList?.resume?.count?.receipt || 0}
                      </TableCell>
                      <TableCell align="center">
                        {saleList?.resume?.total?.receipt || 0}
                      </TableCell>
                      <TableCell align="center">
                        {saleList?.resume?.count?.invoice || 0}
                      </TableCell>
                      <TableCell align="center">
                        {saleList?.resume?.total?.invoice || 0}
                      </TableCell>
                      <TableCell align="center">
                        {saleList?.resume?.count_total || 0}
                      </TableCell>
                      <TableCell align="center">
                        {saleList?.resume?.sum_total || 0}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div>
                  Imprimir
                  <ReceiptIcon
                    onClick={() => generateSalesResumeTicket()}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
