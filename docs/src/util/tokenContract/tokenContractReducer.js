const initialState = {
  tokenContract: null
}

const tokenContractReducer = (state = initialState, action) => {
  if (action.type === 'TOKEN_CONTRACT')
  {
    return Object.assign({}, state, {
      tokenContract: action.payload.tokenContract
    })
  }

  return state
}

export default tokenContractReducer
