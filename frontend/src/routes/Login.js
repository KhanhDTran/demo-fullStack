import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../store/actions";
import "./Login.scss";
import { loginApi } from "../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
      showPassword: false,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleInputChange = (e, input) => {
    this.setState({ message: "" });
    if (input === "email") {
      this.setState({ email: e.target.value });
    }
    if (input === "password") {
      this.setState({ password: e.target.value });
    }
  };

  handleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  checkInput = () => {
    if (!this.state.email) {
      this.setState({ message: "Please enter email !" });
      return false;
    }
    if (!this.state.password) {
      this.setState({ message: "Please enter password !" });
      return false;
    }
    return true;
  };

  handleLogin = async () => {
    let check = this.checkInput();
    if (check) {
      try {
        let response = await loginApi(this.state.email, this.state.password);
        if (response.data.errCode !== 0) {
          this.setState({ message: response.data.message });
        } else {
          this.props.userLoginSuccess(response.data.user);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.handleLogin();
    }
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-form">
          <div className="login-label">
            <span>Login</span>
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="enter email..."
              value={this.state.email}
              onChange={(e) => {
                this.handleInputChange(e, "email");
              }}
              onKeyDown={(e) => {
                this.handleKeyDown(e);
              }}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type={!this.state.showPassword ? "password" : "text"}
              id="password"
              placeholder="enter password..."
              value={this.state.password}
              onChange={(e) => {
                this.handleInputChange(e, "password");
              }}
              onKeyDown={(e) => {
                this.handleKeyDown(e);
              }}
            />
            <i
              className={
                this.state.showPassword ? "fa fa-eye-slash" : "fa fa-eye"
              }
              onClick={() => this.handleShowPassword()}
            ></i>
          </div>
          <div className="forgot-password">
            <span>Forgot Password?</span>
            <span style={{ color: "red" }}>{this.state.message}</span>
          </div>
          <div className="submit-form">
            <button
              onClick={() => {
                this.handleLogin();
              }}
            >
              Login
            </button>
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
      </div>
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
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
