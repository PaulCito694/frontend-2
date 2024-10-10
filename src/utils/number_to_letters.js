export function numberToLetters(monto) {
  // Definir los arrays con las palabras para los números y las unidades
  var units = [
    '',
    'UN',
    'DOS',
    'TRES',
    'CUATRO',
    'CINCO',
    'SEIS',
    'SIETE',
    'OCHO',
    'NUEVE',
  ]
  var decenas = [
    'DIEZ',
    'ONCE',
    'DOCE',
    'TRECE',
    'CATORCE',
    'QUINCE',
    'DIECISEIS',
    'DIECISIETE',
    'DIECIOCHO',
    'DIECINUEVE',
  ]
  var decenas2 = [
    'VEINTE',
    'TREINTA',
    'CUARENTA',
    'CINCUENTA',
    'SESENTA',
    'SETENTA',
    'OCHENTA',
    'NOVENTA',
  ]
  var centenas = [
    'CIENTO',
    'DOSCIENTOS',
    'TRESCIENTOS',
    'CUATROCIENTOS',
    'QUINIENTOS',
    'SEISCIENTOS',
    'SETECIENTOS',
    'OCHOCIENTOS',
    'NOVECIENTOS',
  ]

  // Separar el monto en parte entera y parte decimal
  var partes = monto.toString().split('.')
  var parteEntera = partes[0]
  var parteDecimal = partes[1] || '00'

  // Convertir la parte entera a letras
  function convertirParteEntera(numero) {
    var num = parseInt(numero)
    if (num === 0) return 'CERO'
    if (num < 10) return units[num]
    if (num < 20) return decenas[num - 10]
    if (num < 100) {
      var decena = Math.floor(num / 10)
      var unidad = num % 10
      if (unidad === 0) return decenas2[decena - 2]
      return decenas2[decena - 2] + ' Y ' + units[unidad]
    }
    if (num < 1000) {
      var centena = Math.floor(num / 100)
      var resto = num % 100
      if (resto === 0) return centenas[centena - 1]
      return centenas[centena - 1] + ' ' + convertirParteEntera(resto)
    }
    return 'MAYOR DE 999'
  }

  // Convertir la parte decimal a letras
  function convertirParteDecimal(numero) {
    var num = parseInt(numero)
    if (num === 0) return 'CERO'
    if (num < 10) return units[num]
    if (num < 20) return decenas[num - 10]
    return 'MAYOR DE 19'
  }

  // Obtener las letras de la parte entera y decimal
  var letrasParteEntera = convertirParteEntera(parteEntera)
  var letrasParteDecimal = convertirParteDecimal(parteDecimal)

  // Construir la frase completa
  var resultado =
    'SON ' + letrasParteEntera + ' CON ' + letrasParteDecimal + '/100 SOLES'

  return resultado
}
