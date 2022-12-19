import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalBooking.scss";
import { Button, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { FormattedMessage } from "react-intl";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
class ModalBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      genders: "",
      selectedGender: null,
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
  }

  componentDidUpdate(prevProps, preState, snapshot) {
    let { language } = this.props;
    if (prevProps.openModal !== this.props.openModal) {
      this.setState({
        modal: !this.state.modal,
      });
    }
    if (prevProps.genders !== this.props.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders, language),
      });
    }
    if (prevProps.timeData !== this.props.timeData) {
      this.setState({ doctorId: this.props.timeData.doctorId });
    }
  }

  buildDataGender = (genders, language) => {
    let result = [];
    if (genders && genders.length > 0) {
      genders.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  saveBookingModal = async () => {
    //validate input

    //call api
    let date = new Date(this.state.birthday).getTime();
    let res = await postPatientBookAppointment({
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      gender: this.state.selectedGender.value,
      doctorId: this.props.timeData.doctorId,
      timeType: this.props.timeData.timeData.keyMap,
    });
    if (res && res.data.errCode === 0) {
      toast.success("Booking successful");
      this.props.toggle();
    } else {
      toast.error("Booking fail");
    }
  };

  handleOnChangeInput = (e) => {
    let copyState = { ...this.state };
    copyState[e.target.id] = e.target.value;
    this.setState({ ...copyState });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleChangeSelect = async (selectedOption) => {
    console.log(selectedOption);
    this.setState({ selectedGender: selectedOption });
  };

  render() {
    let { genders } = this.state;
    let { timeData } = this.props;
    let doctorId = timeData && !_.isEmpty(timeData) ? timeData.doctorId : "";
    return (
      <>
        <ModalBody>
          <div className="modal-booking-container">
            <div className="doctor-info">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescription={false}
                timeData={timeData}
              />
            </div>
            <div className="row">
              {/* Họ tên */}
              <div className="col-6 form-group">
                <label htmlFor="name">
                  <FormattedMessage id="patient.booking-modal.full-name" />
                </label>
                <input
                  type="text"
                  id="name"
                  value={this.state.name}
                  className="form-control"
                  onChange={(e) => {
                    this.handleOnChangeInput(e);
                  }}
                />
              </div>
              {/* Số điện thoại */}
              <div className="col-6 form-group">
                <label htmlFor="phoneNumber">
                  <FormattedMessage id="patient.booking-modal.phone-number" />
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(e) => {
                    this.handleOnChangeInput(e);
                  }}
                />
              </div>
              {/* Địa chỉ email */}
              <div className="col-6 form-group">
                <label htmlFor="email">
                  <FormattedMessage id="patient.booking-modal.full-name" />
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={(e) => {
                    this.handleOnChangeInput(e);
                  }}
                />
              </div>
              {/* Địa chỉ liên hệ */}
              <div className="col-6 form-group">
                <label htmlFor="address">
                  <FormattedMessage id="patient.booking-modal.address" />
                </label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  value={this.state.address}
                  onChange={(e) => {
                    this.handleOnChangeInput(e);
                  }}
                />
              </div>
              {/* Lý do khám */}
              <div className="col-12 form-group">
                <label htmlFor="reason">
                  <FormattedMessage id="patient.booking-modal.reason" />
                </label>
                <input
                  type="text"
                  id="reason"
                  className="form-control"
                  value={this.state.reason}
                  onChange={(e) => {
                    this.handleOnChangeInput(e);
                  }}
                />
              </div>
              {/* Ngày sinh */}
              <div className="col-6 form-group">
                <label htmlFor="birthday">
                  {" "}
                  <FormattedMessage id="patient.booking-modal.birthday" />
                </label>
                <DatePicker
                  id="birthday"
                  onChange={this.handleOnchangeDatePicker}
                  className="form-control"
                  value={this.state.birthday}
                />
              </div>
              {/* Giới tính */}
              <div className="col-6 form-group">
                <label htmlFor="gender">
                  {" "}
                  <FormattedMessage id="patient.booking-modal.gender" />
                </label>
                <Select
                  placeholder=""
                  value={this.state.selectedGender}
                  onChange={this.handleChangeSelect}
                  options={genders}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.saveBookingModal()}>
            <FormattedMessage id="patient.booking-modal.confirm" />
          </Button>{" "}
          <Button color="secondary" onClick={this.props.toggle}>
            <FormattedMessage id="patient.booking-modal.cancel" />
          </Button>
        </ModalFooter>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);
