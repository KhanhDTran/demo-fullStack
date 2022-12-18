import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import * as actions from "../../../store/actions";
import { NumericFormat } from "react-number-format";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extraInfo: null,
      priceValue: "",
      province: "",
      payment: "",
    };
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, preState, snapshot) {
    let { language } = this.props;
    if (language !== prevProps.language) {
      this.changeStateWhenChangeLanguage(this.state.extraInfo, language);
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      this.props.fetchExtraInfoById(this.props.doctorId);
    }
    if (this.props.doctorExtraInfo !== prevProps.doctorExtraInfo) {
      this.setState({
        extraInfo: this.props.doctorExtraInfo,
      });
    }
    if (this.state.extraInfo !== preState.extraInfo) {
      this.changeStateWhenChangeLanguage(this.state.extraInfo, language);
    }
  }

  changeStateWhenChangeLanguage = (extraInfo, language) => {
    if (
      extraInfo &&
      extraInfo.priceData &&
      extraInfo.provinceData &&
      extraInfo.paymentData
    ) {
      if (language === LANGUAGES.VI) {
        this.setState({
          priceValue: extraInfo.priceData.valueVi,
          province: extraInfo.provinceData.valueVi,
          payment: extraInfo.paymentData.valueVi,
        });
      } else {
        this.setState({
          priceValue: extraInfo.priceData.valueEn,
          province: extraInfo.provinceData.valueEn,
          payment: extraInfo.paymentData.valueEn,
        });
      }
    }
  };

  render() {
    let { language } = this.props;
    let { extraInfo, priceValue, payment } = this.state;
    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
          <div className="text-address">
            {" "}
            <FormattedMessage id={"patient.extra-infor-doctor.address"} />
          </div>
          <div className="name-clinic">
            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
          </div>
          <div className="detail-address">
            {extraInfo && extraInfo.addressClinic
              ? extraInfo.addressClinic
              : ""}
          </div>
        </div>
        <div className="content-down">
          <div className="price">
            <FormattedMessage id={"patient.extra-infor-doctor.price"} />
            <span className="price-value">
              {" "}
              {language === LANGUAGES.EN && priceValue && (
                <NumericFormat
                  value={priceValue}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              )}
              {language === LANGUAGES.VI && priceValue && (
                <NumericFormat
                  value={priceValue}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"VNĐ"}
                />
              )}
            </span>
          </div>
          <div className="price-table">
            <div className="pay-method">
              {" "}
              <FormattedMessage
                id={"patient.extra-infor-doctor.payment-method"}
              />
              {extraInfo && extraInfo.paymentData && (
                <span className="payment-method">{payment}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctorExtraInfo: state.admin.doctorExtraInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchExtraInfoById: (doctorId) =>
      dispatch(actions.fetchExtraInfoById(doctorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
