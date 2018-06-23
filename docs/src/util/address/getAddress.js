import store from '../../store'

export const ADDRESS = 'ADDRESS'
function address(address) {
  return {
    type: ADDRESS,
    payload: address
  };
}

let getAddress = new Promise(function(resolve, reject) {
  window.addEventListener('load', function(dispatch) {
    let web3 = store.getState().web3.web3Instance;
    var results
    if (typeof web3 !== 'undefined') {
      web3.eth.getCoinbase((error, coinbase) => {
        if (error) {
          console.error(error)
        }
        results = {
          address: coinbase
        }
        console.log('Address stored!');
        resolve(store.dispatch(address(results)))
      })
    }
  })
})

export default getAddress