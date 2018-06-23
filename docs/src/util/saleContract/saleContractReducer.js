const initialState = {
  saleContract: null
}

const saleContractReducer = (state = initialState, action) => {
  if (action.type === 'SALE_CONTRACT')
  {
    return Object.assign({}, state, {
      saleContract: action.payload.saleContract
    })
  }

  return state
}

export default saleContractReducer
