import React, { Component } from "react";
import { connect } from "react-redux";
import logoImg from "../../assets/images/bookingcare-2020.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguage } from "../../store/actions/userActions";
import "./HomeHeader.scss";
import { withRouter } from "react-router";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };

  returnHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="header-left-content">
            <i className="fa fa-bars"></i>
            <img
              alt=""
              src={logoImg}
              onClick={() => {
                this.returnHome();
              }}
            />
          </div>
          <div className="header-center-content">
            <div className="child-content">
              <label className="label">
                <FormattedMessage id="homeHeader.specialty" />{" "}
              </label>
              <span className="detail">
                <FormattedMessage id="homeHeader.searchDoctor" />{" "}
              </span>
            </div>
            <div className="child-content">
              <label className="label">
                <FormattedMessage id="homeHeader.healthFacility" />
              </label>
              <span className="detail">
                <FormattedMessage id="homeHeader.selectRoom" />{" "}
              </span>
            </div>
            <div className="child-content">
              <label className="label">
                <FormattedMessage id="homeHeader.doctor" />
              </label>
              <span className="detail">
                <FormattedMessage id="homeHeader.selectDoctor" />{" "}
              </span>
            </div>
            <div className="child-content">
              <label className="label">
                <FormattedMessage id="homeHeader.checkPack" />
              </label>
              <span className="detail">
                <FormattedMessage id="homeHeader.healChecking" />{" "}
              </span>
            </div>
          </div>
          <div className="header-right-content">
            <i className="fa fa-question-circle">Hỗ Trợ</i>
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
        </div>

        {this.props.isShowBanner && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search">
                <i className="fa fa-search"></i>
                <input type="text" placeholder="Tìm bác sĩ...." />
              </div>
            </div>
            <div className="content-down">
              <ul>
                <li>
                  <i className="fa fa-medkit"></i>
                  <span className="title-options">Khám Chuyên Khoa</span>
                </li>
                <li>
                  <i className="fa fa-medkit"></i>
                  <span className="title-options">Khám Từ xa</span>
                </li>
                <li>
                  <i className="fa fa-medkit"></i>
                  <span className="title-options">Khám Tổng Quát</span>
                </li>
                <li>
                  <i className="fa fa-medkit"></i>
                  <span className="title-options">Xét nghiệm y học</span>
                </li>
                <li>
                  <i className="fa fa-medkit"></i>
                  <span className="title-options">Sức khỏe tinh thần</span>
                </li>
                <li>
                  <i className="fa fa-medkit"></i>
                  <span className="title-options">Khám Nha Khoa</span>
                </li>
                <li>
                  <i className="fa fa-medkit"></i>
                  <span className="title-options">Gói phẫu thuật</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </React.Fragment>
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
    changeLanguage: (language) => dispatch(changeLanguage(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
