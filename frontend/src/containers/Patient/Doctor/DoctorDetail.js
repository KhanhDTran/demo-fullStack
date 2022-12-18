import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DoctorDetail.scss";
import { getDoctorDetailInfo } from "../../../services/userService";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
class DoctorDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorDetail: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let res = await getDoctorDetailInfo(this.props.match.params.id);

      if (res && res.data.errCode === 0) {
        this.setState({
          doctorDetail: res.data.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, preState, snapshot) {}

  render() {
    let language = this.props.language;
    let doctor = this.state.doctorDetail;
    let { doctorDetail } = this.state;
    let nameEn = "",
      nameVi = "";
    if (doctor && doctor.positionData) {
      nameVi = `${doctor.positionData.valueVi} ${doctor.firstName} ${doctor.lastName}`;
      nameEn = `${doctor.positionData.valueEn} ${doctor.firstName} ${doctor.lastName}`;
    }
    return (
      <>
        <HomeHeader />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  doctor.image && doctor.image ? doctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">{language === "vi" ? nameVi : nameEn}</div>
              <div className="down">
                {doctor.Markdown && doctor.Markdown.description && (
                  <span>doc{doctor.Markdown.description}</span>
                )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorId={doctorDetail ? doctorDetail.id : -1} />
            </div>
            <div className="content-right">
              <DoctorExtraInfor
                doctorId={doctorDetail ? doctorDetail.id : -1}
              />
            </div>
          </div>
          <div className="detail-info-doctor">
            {doctor && doctor.Markdown && doctor.Markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: doctor.Markdown.contentHTML,
                }}
              ></div>
            )}
          </div>
          <div className="comment"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
