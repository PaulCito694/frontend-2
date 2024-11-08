export const clearMutator = ([name], state, { changeValue }) => {
  changeValue(state, name, () => undefined)
}

export const changeMutator = ([name, newValue], state, { changeValue }) => {
  changeValue(state, name, () => newValue)
}

export const clearArrayMutator = ([name], state, { changeValue }) => {
  const currentValue = state.formState.values[name] || []

  currentValue.forEach((_, index) => {
    changeValue(state, `${name}[${index}]`, () => undefined)
  })
}

export const markForDestroyMutator = (args, state, { changeValue }) => {
  const [field, index] = args
  changeValue(state, field, (values = []) => {
    const currentValue = values?.[index] || {}
    return Object.assign([], values, {
      [index]: { ...currentValue, _destroy: '1' },
    })
  })
}
