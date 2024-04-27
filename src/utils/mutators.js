export const clearMutator = ([name], state, { changeValue }) => {
  changeValue(state, name, () => undefined)
}
