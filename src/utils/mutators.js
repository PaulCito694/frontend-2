export const clearMutator = ([name], state, { changeValue }) => {
  changeValue(state, name, () => undefined)
}

export const changeMutator = ([name, newValue], state, { changeValue }) => {
  changeValue(state, name, () => newValue)
}
