import { connect } from 'react-redux'
import ICOSaleForm from './ICOSaleForm'
import { buyICO } from './ICOSaleFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    amount: state.user.data.amount
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onICOSaleFormSubmit: (amount) => {
      event.preventDefault()
      dispatch(buyICO(amount))
    }
  }
}

const ICOSaleFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ICOSaleForm)

export default ICOSaleFormContainer
