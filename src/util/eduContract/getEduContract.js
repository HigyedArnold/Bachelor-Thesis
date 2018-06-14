import EduScience from '../../../build/contracts/EduScience.json'
import store from '../../store'
const contract = require('truffle-contract')

export const EDU_CONTRACT = 'EDU_CONTRACT'
function eduContract(contract) {
  return {
    type: EDU_CONTRACT,
    payload: contract
  };
}

let getEduContract = new Promise(function(resolve, reject) {
  window.addEventListener('load', function(dispatch) {
    let web3 = store.getState().web3.web3Instance;
    var results
    if (typeof web3 !== 'undefined') {
      const eduScience = contract(EduScience)
      eduScience.setProvider(web3.currentProvider)
      eduScience.deployed().then(function(instance) {
        results = {
          eduContract: instance
        }
        console.log('EduContract stored!');
        resolve(store.dispatch(eduContract(results)))
      })
    }
  })
})

export default getEduContract
