import { connect } from 'react-redux'
import PublishForm from './PublishForm'
import { storeData } from './PublishFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    buffer: state.user.data.buffer,
    title: state.user.data.title
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStoreData: (buffer, title) => {
      event.preventDefault()
      dispatch(storeData(buffer, title))
    }
  }
}

const PublishFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublishForm)

export default PublishFormContainer
