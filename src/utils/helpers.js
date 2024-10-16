export const saleStateTransduction = state => {
  const states = {
    payed: 'Pagado',
    pending_payment: 'Pendiente de pago',
  }

  return states[state] || states['payed']
}

export const saleKindTransduction = state => {
  const states = {
    sales_note: 'Nota de venta',
    receipt: 'Boleta',
    invoice: 'Factura',
  }

  return states[state] || states['sales_note']
}
