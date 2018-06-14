import { connect } from 'react-redux'
import TransferForm from './TransferForm'
import { transfer, approve, transferFrom } from './TransferFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    amount: state.user.data.amount,
    toAddress: state.user.data.toAddress,
    apamount: state.user.data.apamount,
    apAddress: state.user.data.apAddress,
    framount: state.user.data.framount,
    frAddress: state.user.data.frAddress,
    frToAddress: state.user.data.frToAddress,
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
    },
    onTransferFromFormSubmit: (framount, frAddress, frToAddress) => {
      event.preventDefault()
      dispatch(transferFrom(framount, frAddress, frToAddress))
    },
  }
}

const TransferFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferForm)

export default TransferFormContainer
