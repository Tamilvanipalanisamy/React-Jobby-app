import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    const {username, password} = this.state
    const userDetails = {username, password}
    event.preventDefault()
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      this.onSuccess(fetchedData.jwt_token)
    } else {
      this.onFailure(fetchedData.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="label-heading">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              placeholder="username"
              value={username}
              id="username"
              className="input-style"
              onChange={this.onChangeUsername}
            />
            <br />
            <label htmlFor="password" className="label-heading">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              placeholder="password"
              value={password}
              id="password"
              className="input-style"
              onChange={this.onChangePassword}
            />
            <br />
            <button type="submit" className="login-btn">
              Login
            </button>
            {showErrorMsg ? <p className="error-msg">*{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
