import { connect } from 'react-redux'
import TransferForm from './TransferForm'
import { transfer } from './TransferFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    amount: state.user.data.amount,
    toAddress: state.user.data.toAddress
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTransferFormSubmit: (amount, toAddress) => {
      event.preventDefault()
      dispatch(transfer(amount, toAddress))
    }
  }
}

const TransferFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferForm)

export default TransferFormContainer
