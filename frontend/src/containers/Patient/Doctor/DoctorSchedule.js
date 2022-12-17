import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleByDate } from "../../../services/userService";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailable: [],
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    this.setArrDays(language);
  }

  componentDidUpdate(prevProps, preState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setArrDays(this.props.language);
    }
  }

  setArrDays = (language) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd -  MM/DD ");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(object);
    }

    this.setState({
      allDays: arrDate,
    });
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
      console.log(res);
    }
  };

  render() {
    let { allDays, allAvailable } = this.state;
    console.log(allAvailable, " ------------");
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select name="" id="" onChange={(e) => this.handleOnchangeSelect(e)}>
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
            <i class="fa fa-calendar" aria-hidden="true">
              {" "}
            </i>
            <span>Lịch khám</span>
          </div>
          <div className="time-content">
            {allAvailable &&
              allAvailable.length > 0 &&
              allAvailable.map((item, index) => {
                return <button key={index}>{item.timeType}</button>;
              })}
          </div>
        </div>
      </div>
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
