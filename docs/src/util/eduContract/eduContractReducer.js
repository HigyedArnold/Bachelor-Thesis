const initialState = {
  eduContract: null
}

const eduContractReducer = (state = initialState, action) => {
  if (action.type === 'EDU_CONTRACT')
  {
    return Object.assign({}, state, {
      eduContract: action.payload.eduContract
    })
  }

  return state
}

export default eduContractReducer
