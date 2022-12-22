import React, { Component } from "react";
import { connect } from "react-redux";
import { postVerifytBookAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import "./VerifyEmail.scss";
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await postVerifytBookAppointment({
        token: token,
        doctorId: doctorId,
      });
      console.log(res);
      if (res && res.data.errCode === 0) {
        this.setState({ statusVerify: true, errCode: 0 });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res.data.errCode ? res.data.errCode : -1,
        });
      }
    }
  }

  componentDidUpdate(prevProps, preState, snapshot) {}

  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="verify-email-container">
          {statusVerify === false ? (
            <div>Loading data... </div>
          ) : (
            <div>
              {+errCode === 0 ? (
                <div className="info-booking">Xác nhận lịch hẹn thành công</div>
              ) : (
                <div className="info-booking">
                  Lịch hẹn không tồn tại hoặc đã xác nhận thành công
                </div>
              )}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
