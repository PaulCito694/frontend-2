import * as XLSX from 'xlsx'
import { saleKindTransduction } from '@/utils/helpers'

export const generateSalesXLSX = saleList => {
  const rows = saleList.results.map((sale, index) => ({
    period: sale.date.replace(/-/g, '').substring(0, 6) + '00',
    cod_uniq: index + 1,
    regime: 'M-RER',
    date: sale.date,
    expiration: sale.date,
    document_type: saleKindTransduction(sale.kind),
    serie: sale.invoice.split('-')[0],
    number: sale.invoice.split('-')[1],
    number_maq: '',
    customer_document_type: '1',
    customer_dni: sale.customer?.person_dni,
    customer_name: sale.customer?.person_name,
    algo1: 0,
    algo2: 0,
    algo3: 0,
    algo4: 0,
    algo5: 0,
    exonerada: sale.total,
    algo6: 0,
    algo7: 0,
    algo8: 0,
    algo9: 0,
    algo10: 0,
    total: sale.total,
    algo11: '',
    algo12: '',
    algo13: '',
    algo14: '',
    algo15: '',
    modified_number: 0,
    algo16: '',
    algo17: '',
    algo18: '',
    state: 1,
    camp_lib: '',
    sale_state: sale.sunat_data?.accepted ? 'aceptado' : 'enviado',
  }))

  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(rows)

  worksheet['!cols'] = Object.keys(rows).map(() => ({ width: 20 }))

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')

  XLSX.utils.sheet_add_aoa(worksheet, [
    [
      'PERIODO',
      'COD.UNIC.',
      'REGIMEN',
      'F.EMISIÓN',
      'F.VENCIMIENTO',
      'TIPO DOC',
      'SERIE',
      'NUMERO',
      'NUM.MAQ.REG.',
      'T.DOC.',
      'NUMERO',
      'RAZÓN SOCIAL',
      'OP.EXPORT.',
      'OP.GRAVADA',
      'DESCUENT.',
      'IGV',
      'DESC.IGV',
      'OP.EXONERADA',
      'OP.INAFECTA',
      'ISC',
      'OP.ARROZ.P.',
      'IMP.ARROZ.P.',
      'OTRO.TRIBUTOS.',
      'TOTAL',
      'MONEDA',
      'T.C.',
      'FEC.COMP.MODIF.',
      'TIPO.DOC.MODIF.',
      'SERIE.DOC.MODIF.',
      'NUM.DOC.MODIF.',
      'ID.CONTR.',
      'ERR.T.C.',
      'COMP.M.P',
      'ESTADO',
      'CAMP.LIB.',
      'ESTADO COMP.',
    ],
  ])

  XLSX.writeFile(workbook, 'Libro electronico de ventas.xlsx')
}

export const generateProductsXLSX = productsList => {
  const rows = productsList.map(product => ({
    product_id: product.id,
    code: product.code,
    unit_med: product.unit_of_measure,
    igv_type: product.igv_type,
    category_id: product.category_id,
    category_code: product.category_name,
    name: product.name,
    cod_monena: product.currency,
    sale_price_inc_igv: product.sale_price_inc_igv,
    min_price: product.customer?.person_dni,
    note: product.customer?.person_name,
    stock_quantity: product.stock_quantity,
    min_stok: product.min_stok,
    icbper: product.icbper,
  }))

  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(rows)

  worksheet['!cols'] = Object.keys(rows).map(() => ({ width: 20 }))

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')

  XLSX.utils.sheet_add_aoa(worksheet, [
    [
      'IDPRODUCTO',
      'CODIGO',
      'ID_UNIDAD_MEDIDA',
      'ID_TIPOAFECTACION_IGV',
      'ID_CATEGORIA',
      'CODIGO_CATEGORIA',
      'NOMBRE',
      'ID_COD_MONEDA',
      'PRECIO_INC_IGV',
      'PRECIO_MINIMO',
      'NOTA',
      'STOCK',
      'STOCK_MINIMO',
      'AFECTO_ICBPER',
    ],
  ])

  XLSX.writeFile(workbook, 'Libro electronico de ventas.xlsx')
}

export const generateInventoryXLSX = productsList => {
  const rows = productsList.map(product => ({
    product_id: product.id,
    code: product.code,
    unit_med: product.unit_of_measure,
    igv_type: product.igv_type,
    category_id: product.category_id,
    category_code: product.category_name,
    name: product.name,
    cod_monena: product.currency,
    sale_price_inc_igv: product.sale_price_inc_igv,
    min_price: product.customer?.person_dni,
    note: product.customer?.person_name,
    stock_quantity: product.stock_quantity,
    min_stok: product.min_stok,
    icbper: product.icbper,
  }))

  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(rows)

  worksheet['!cols'] = Object.keys(rows).map(() => ({ width: 20 }))

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')

  XLSX.utils.sheet_add_aoa(worksheet, [
    [
      'IDPRODUCTO',
      'CODIGO',
      'ID_UNIDAD_MEDIDA',
      'ID_TIPOAFECTACION_IGV',
      'ID_CATEGORIA',
      'CODIGO_CATEGORIA',
      'NOMBRE',
      'ID_COD_MONEDA',
      'PRECIO_INC_IGV',
      'PRECIO_MINIMO',
      'NOTA',
      'STOCK',
      'STOCK_MINIMO',
      'AFECTO_ICBPER',
    ],
  ])

  XLSX.writeFile(workbook, 'Libro electronico de ventas.xlsx')
}
