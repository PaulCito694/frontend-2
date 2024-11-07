import moment from 'moment'

export const mix = (...args) => (value = null, values = null) =>
  args.reduce((a, b) => (b && b(value, values)) || a, undefined)

export const maxLength = (
  length,
  message = `Ingresar máximo ${length} caracteres.`,
) => value =>
  value ? ((value || '').length > length ? message : undefined) : undefined

export const minLength = (
  length,
  message = `Ingresar mínimo ${length} caracteres.`,
) => value =>
  value ? ((value || '').length < length ? message : undefined) : undefined

export const length = (
  length,
  message = `Ingresar ${length} caracteres.`,
) => value =>
  value ? ((value || '').length !== length ? message : undefined) : undefined

export const required = (message = 'Campo requerido.') => value => {
  if (typeof value === 'string') {
    value = value.replace(/\s+/g, '')
  }
  return value || value === 0 ? undefined : message
}

export const isEmail = (message = 'No es un email válido.') => value => {
  const EMAIL_REGEX = /^[\w-.]+@([a-zA-Z0-9-]+\.)+([a-zA-Z-]){2,4}$/
  return value
    ? EMAIL_REGEX.test(value.trim())
      ? undefined
      : message
    : undefined
}

export const isPhone = (message = 'No es un teléfono válido.') => value => {
  const PHONE_REGEX = /^\+?[0-9]{1,3}-?[0-9]{5,12}$/
  return value
    ? PHONE_REGEX.test(value.trim())
      ? undefined
      : message
    : undefined
}

export const isPeruvianCellphone = (
  message = 'No es un teléfono válido.',
) => value => {
  const PERUVIAN_PHONE_REGEX = /^9[0-9]{8}$/
  return value
    ? PERUVIAN_PHONE_REGEX.test(value)
      ? undefined
      : message
    : undefined
}

export const isNumber = (message = 'Solo se permiten números.') => value => {
  const NUMBER_REGEX = /^-?\d+(.\d+)?$/
  return value ? (NUMBER_REGEX.test(value) ? undefined : message) : undefined
}

export const isInteger = (
  message = 'Solo se permiten números enteros.',
) => value => {
  const NUMBER_REGEX = /^-?\d+$/
  return value ? (NUMBER_REGEX.test(value) ? undefined : message) : undefined
}

export const isAlphanumeric = (
  message = 'Solo se permiten letras y números.',
) => value => {
  const ALPHANUMERIC_REGEX = /^[A-Za-z0-9]+$/
  return value
    ? ALPHANUMERIC_REGEX.test(value)
      ? undefined
      : message
    : undefined
}

export const isDate = (message = 'Ingresa una fecha válida.') => value =>
  value === null
    ? undefined
    : value instanceof Date && Number.isNaN(value?.getTime())
    ? message
    : undefined

export const isNotFutureDate = (
  message = 'No puedes ingresar una fecha posterior a la actual.',
) => value => {
  const dateFns = new moment()
  const today = new Date()
  return value === null
    ? undefined
    : dateFns.isAfter(value, today)
    ? message
    : undefined
}

export const editPassword = (
  message = 'Si cambias tu contraseña, ingresar mínimo 8 caracteres.',
) => value => (!value ? undefined : value.length >= 8 ? undefined : message)

export const isLetter = (message = 'Solo se permite letras.') => value => {
  const LETTER = /^([a-zA-ZÀ-ÿ\u00f1\u00d1 ])+$/
  return value ? (LETTER.test(value) ? undefined : message) : undefined
}

export const startWith = (
  searchString,
  message = `Debe empezar con ${searchString}.`,
) => value =>
  value ? (value.startsWith(searchString) ? undefined : message) : undefined

export const notHasBlankSpaces = (
  message = `No puede contener espacios en blanco.`,
) => value => {
  const BLANK_SPACES = /\s+/
  return value ? (BLANK_SPACES.test(value) ? message : undefined) : undefined
}

export const lessThan = (
  length,
  message = `No puede ser menor que ${length}.`,
) => value => {
  return value && parseFloat(value) < parseFloat(length) ? message : undefined
}

export const moreThan = (
  length,
  message = `No puede ser mayor que ${length}.`,
) => value => {
  return value && parseFloat(value) >= parseFloat(length) ? message : undefined
}
