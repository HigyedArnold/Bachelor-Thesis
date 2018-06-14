import { connect } from 'react-redux'
import PublishForm from './PublishForm'
import { storeData } from './PublishFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    buffer: state.user.data.buffer
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStoreData: (buffer) => {
      event.preventDefault()
      dispatch(storeData(buffer))
    }
  }
}

const PublishFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublishForm)

export default PublishFormContainer
