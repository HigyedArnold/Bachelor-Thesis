const initialState = {
  data: {
    name: null,
    amount: null
  }
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN' || 
    action.type === 'USER_UPDATED') {
    return Object.assign({}, state, {
      data: {
        name: action.payload
    }})
  } else if (action.type === 'BUY_ICO') {
    return Object.assign({}, state, {
      data: {
        amount: action.payload
    }})
  } else if (action.type === 'USER_LOGGED_OUT') {
    return Object.assign({}, state, {
      data: {
        name: null,
        amount: null,
    }})
  }

  return state
}

export default userReducer
