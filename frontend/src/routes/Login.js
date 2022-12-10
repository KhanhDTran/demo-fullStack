import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../store/actions";
// import { KeyCodeUtils, LanguageUtils } from "../utils";

import "./Login.scss";
import { FormattedMessage } from 'react-intl';

// import adminService from '../services/adminService';
import { loginApi } from '../services/userService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: ""
    };
  }

  componentDidMount() { }

  componentWillUnmount() { }

  handleInputChange = (e, input) => {
    if (input === 'email') {
      this.setState({ email: e.target.value })
    }
    if (input === 'password') {
      this.setState({ password: e.target.value })
    }
  }

  handleLogin = async () => {
    try {
      let response = await loginApi(this.state.email, this.state.password)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  render() {

    return (
      < div className="login-container" >
        <div className="login-form">
          <div className="login-label">
            <span>Login</span>
          </div>
          <div className="input-container">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="enter email..."
              value={this.state.email} onChange={(e) => { this.handleInputChange(e, 'email') }} />
          </div>
          <div className="input-container">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="enter password..."
              value={this.state.password} onChange={(e) => { this.handleInputChange(e, 'password') }}
            />
          </div>
          <div className="forgot-password">
            <span>Forgot Password?</span>
            <span style={{ color: 'red' }}>{this.state.message}</span>
          </div>
          <div className="submit-form">
            <button onClick={() => { this.handleLogin() }}>Login</button>
          </div>
          <div className="other-login">
            <div className="login-with">
              <span>Or login with</span>
            </div>
            <div className="social-login">

              <i class="fab fa-facebook-f facebook"></i>
              <i class="fab fa-google google"></i>

            </div>
          </div>
        </div>
      </ div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (adminInfo) => dispatch(actions.userLoginSuccess(adminInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
