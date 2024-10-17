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
