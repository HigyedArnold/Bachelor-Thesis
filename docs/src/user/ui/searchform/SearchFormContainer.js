import { connect } from 'react-redux'
import SearchForm from './SearchForm'
import {} from './SearchFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

const SearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)

export default SearchFormContainer
