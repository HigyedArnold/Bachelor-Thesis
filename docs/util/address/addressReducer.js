const initialState = {
  address: null
}

const addressReducer = (state = initialState, action) => {
  if (action.type === 'ADDRESS')
  {
    return Object.assign({}, state, {
      address: action.payload.address
    })
  }

  return state
}

export default addressReducer
