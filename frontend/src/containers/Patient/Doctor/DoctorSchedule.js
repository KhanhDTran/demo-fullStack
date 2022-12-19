import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import ModalBooking from "./Modal/ModalBooking";
import { Modal, ModalHeader } from "reactstrap";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailable: [],
      modal: false,
      modalScheduleTimeData: {},
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    this.setState({
      allDays: this.getArrDays(language),
    });
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async componentDidUpdate(prevProps, preState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({ allDays: this.getArrDays(this.props.language) });
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      let { allDays } = this.state;
      if (allDays && allDays.length > 0) {
        let res = await getScheduleByDate(
          this.props.doctorId,
          allDays[0].value
        );
        if (res && res.data.errCode === 0) {
          this.setState({
            allAvailable: res.data ? res.data.data : [],
          });
        }
      }
    }
  }

  getArrDays = (language) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          object.label = `Hôm nay - ${moment(new Date()).format("DD/MM")}`;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
        }
      } else {
        if (i === 0) {
          object.label = `Today - ${moment(new Date()).format("MM/DD")}`;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd -  MM/DD ");
        }
      }
      object.label = this.capitalizeFirstLetter(object.label);
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(object);
    }
    return arrDate;
  };

  handleOnchangeSelect = async (e) => {
    let date = e.target.value;
    if (this.props.doctorId && this.props.doctorId !== -1) {
      let res = await getScheduleByDate(this.props.doctorId, date);
      if (res && res.data.errCode === 0) {
        this.setState({
          allAvailable: res.data ? res.data.data : [],
        });
      }
    }
  };

  handleBooking = (item) => {
    this.setState({ modalScheduleTimeData: item });
    this.toggle();
  };

  render() {
    let { allDays, allAvailable } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select
              name=""
              id=""
              onChange={(e) => this.handleOnchangeSelect(e)}
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available">
            <div className="text-carlendar">
              <i className="fa fa-calendar" aria-hidden="true"></i>
              <span>
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </div>
            <div className="time-content">
              {allAvailable && allAvailable.length > 0 ? (
                allAvailable.map((item, index) => {
                  let timeDisplay =
                    language === LANGUAGES.VI
                      ? item.timeData.valueVi
                      : item.timeData.valueEn;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        this.handleBooking(item);
                      }}
                    >
                      {timeDisplay}
                    </button>
                  );
                })
              ) : (
                <span>
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="modal-booking">
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
            size="lg"
            centered
          >
            <ModalHeader toggle={this.toggle}>Booking Heath Care</ModalHeader>
            <ModalBooking
              timeData={this.state.modalScheduleTimeData}
              toggle={this.toggle}
            />
          </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
