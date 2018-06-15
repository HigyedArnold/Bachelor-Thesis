import store from '../../../store'
import swal from 'sweetalert'
import ipfs from '../../../ipfs';

export function storeData(buffer, title) {
  let coinbase = store.getState().address.address
  let contractEduInstance = store.getState().eduContract.eduContract
  //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add 
  ipfs.add(buffer).then(function(ipfsHash) {
    console.log(ipfsHash);
    let data = ipfsHash[0].hash
    contractEduInstance.publish(data, title, {from: coinbase}).then(function(result) {
      console.log(result)
      swal('Uploaded: ' + title + '!', 'Transaction successful!','success')
    })
  }).catch(function(error) {
    // ERROR
  })
}