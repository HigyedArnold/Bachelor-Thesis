import { connect } from 'react-redux'
import TransferForm from './TransferForm'
import { transfer, approve } from './TransferFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    amount: state.user.data.amount,
    toAddress: state.user.data.toAddress,
    apamount: state.user.data.apamount,
    apAddress: state.user.data.apAddress
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTransferFormSubmit: (amount, toAddress) => {
      event.preventDefault()
      dispatch(transfer(amount, toAddress))
    },
    onApproveFormSubmit: (apamount, apAddress) => {
      event.preventDefault()
      dispatch(approve(apamount, apAddress))
    }
  }
}

const TransferFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferForm)

export default TransferFormContainer
