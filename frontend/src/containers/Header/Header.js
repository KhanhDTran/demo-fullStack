import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { useState } from "react";
import { connect } from "react-redux";
import { changeLanguage } from "../../store/actions/userActions";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import _ from "lodash";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
      this.setState({
        menuApp: menu,
      });
    }
  }

  render() {
    let language = this.props.language;
    const { processLogout, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        <div className="right-side-container">
          {/* nút logout */}
          <div className="languages">
            <span className="welcome">
              <FormattedMessage id="homeHeader.welcome"></FormattedMessage> ,
              {userInfo && this.props.userInfo.firstName
                ? this.props.userInfo.firstName
                : ""}{" "}
            </span>
            <span
              className={
                language === "vi" ? "language-vi active" : "language-vi"
              }
              onClick={() => this.changeLanguage(LANGUAGES.VI)}
            >
              VN
            </span>
            <span
              className={
                language === "en" ? "language-en active" : "language-en"
              }
              onClick={() => this.changeLanguage(LANGUAGES.EN)}
            >
              EN
            </span>
          </div>
          <div
            className="btn btn-logout"
            title="log-out"
            onClick={processLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguage: (language) => dispatch(changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
