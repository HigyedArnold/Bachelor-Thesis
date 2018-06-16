import React, { Component } from 'react'
import swal from 'sweetalert'
import store from '../../../store'

class SearchForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
     
    }

  }


  onSubmit(event) {
   
  }

  render() {
    return (
      <div ref="ref">
        <form className="pure-form pure-form-stacked" onSubmit={this.onSubmit.bind(this)}>
         
        </form>
     </div>
    );
  }

}

export default SearchForm