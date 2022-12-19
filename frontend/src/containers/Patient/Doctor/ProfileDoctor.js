import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { NumericFormat } from "react-number-format";

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

  render() {
    let { dataProfile } = this.state;
    let { language } = this.props;
    console.log(dataProfile);
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
              {dataProfile.Markdown && dataProfile.Markdown.description && (
                <span>doc{dataProfile.Markdown.description}</span>
              )}
            </div>
          </div>
        </div>
        <div className="price">
          {" "}
          <span className="price-title"> Giá khám:</span>
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
