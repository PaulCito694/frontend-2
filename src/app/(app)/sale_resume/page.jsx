'use client'

import React, { useEffect } from 'react'
import Header from '@/app/(app)/Header'
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

const Page = () => {
  const { saleList, isMutating, trigger } = useSales()
  const [total, setTotal] = React.useState(0)
  const now = moment()

  useEffect(() => {
    console.debug(saleList?.length)
    if (saleList?.length === 0) {
      setTotal(0)
    } else {
      saleList?.forEach(sale => {
        setTotal(lastTotal => lastTotal + Number(sale.total))
      })
    }
  }, [saleList])

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

  return (
    <>
      <Header title="Scrum poker" />
      <div className="pt-12">
        <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <Form
                initialValues={{
                  from: now,
                  to: now,
                }}
                onSubmit={values => {
                  setTotal(0)
                  trigger(
                    `date_lteq=${moment(values.to).format(
                      'YYYY-MM-DD',
                    )}&date_gteq=${moment(values.from).format(
                      'YYYY-MM-DD',
                    )}&employee_id_eq=${values.employee_id}`,
                  )
                }}
                render={({ handleSubmit, submitting, values }) => (
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
                    />
                    <DatePickerField name="from" label="Desde" />
                    <DatePickerField name="to" label="Hasta" />
                    <Button type="submit" disabled={submitting}>
                      Buscar
                    </Button>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
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
            <div className="p-6 bg-white border-b border-gray-200">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ minWidth: 300 }}>Fecha</TableCell>
                    <TableCell>Comprobante</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>PDF</TableCell>
                    <TableCell>Ticket</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {saleList?.map((sale, index) => (
                    <TableRow
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
                <span>{total}</span>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
