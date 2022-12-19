import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { NumericFormat } from "react-number-format";
import _ from "lodash";
import moment from "moment";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getDoctorInfo(this.props.doctorId);
    this.setState({ dataProfile: data });
  }

  async componentDidUpdate(prevProps, preState, snapshot) {}

  getDoctorInfo = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.data && res.data.data && res.data.errCode === 0) {
        result = res.data.data;
      }
    }
    return result;
  };

  renderTimeBooking = (timeData) => {
    let { language } = this.props;
    if (timeData && !_.isEmpty(timeData)) {
      let time =
        language === LANGUAGES.VI
          ? timeData.timeData.valueVi
          : timeData.timeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+timeData.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+timeData.date / 1000)
              .locale("en")
              .format("ddd -  MM/DD/YYYY");
      return (
        <>
          <div> {time}</div>
          <div> {this.capitalizeFirstLetter(date)}</div>
          <div>
            {" "}
            <FormattedMessage id="patient.booking-modal.free-booking" />
          </div>
        </>
      );
    } else {
      return <></>;
    }
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    let { dataProfile } = this.state;
    let { language, isShowDescription, timeData } = this.props;
    let nameEn = "",
      nameVi = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.firstName} ${dataProfile.lastName}`;
      nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    return (
      <>
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile.image && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDescription ? (
                <>
                  {dataProfile.Markdown && dataProfile.Markdown.description && (
                    <span>doc{dataProfile.Markdown.description}</span>
                  )}
                </>
              ) : (
                <>{this.renderTimeBooking(timeData)}</>
              )}
            </div>
          </div>
        </div>
        <div className="price">
          {" "}
          <span className="price-title">
            <FormattedMessage id="patient.booking-modal.price" />:
          </span>
          {dataProfile &&
          dataProfile.Doctor_info &&
          language === LANGUAGES.VI ? (
            <NumericFormat
              value={dataProfile.Doctor_info.priceData.valueVi}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"VNĐ"}
            />
          ) : (
            ""
          )}
          {dataProfile &&
          dataProfile.Doctor_info &&
          language === LANGUAGES.EN ? (
            <NumericFormat
              value={dataProfile.Doctor_info.priceData.valueEn}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
