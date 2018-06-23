import React, { Component } from 'react'
import swal from 'sweetalert'

class ProfileForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.name.length < 2)
    {
      return swal('Please fill in your name.')
    }
    this.props.onProfileFormSubmit(this.state.name)
    this.setState({name: ''})
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={this.state.name} pattern="[A-Z][A-Za-z0-9 ]{0,31}" onChange={this.onInputChange.bind(this)} placeholder="Name" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Update</button>
        </fieldset>
      </form>
    )
  }
}

export default ProfileForm
