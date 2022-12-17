import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, DATE_FORMAT } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import moment from "moment";
import { saveScheduleDoctor } from "../../../services/userService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: null,
      currentDate: new Date().setHours(0, 0, 0, 0),
      rangeTime: [],
      selectedTime: false,
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAallScheduleTime();
  }
  componentDidUpdate(prevProps, preState, snapshot) {
    if (prevProps.doctors !== this.props.doctors) {
      let dataSelect = this.buildDataInputSelect(this.props.doctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.doctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data.map((item) => {
          item.isSelected = false;
          return item;
        });
      }
      this.setState({
        rangeTime: this.props.allScheduleTime,
      });
    }
  }
  buildDataInputSelect = (input) => {
    let result = [];
    let language = this.props.language;
    if (input && input.length > 0) {
      input.map((item, index) => {
        let object = {};
        let labelVi = `${item.firstName} ${item.lastName}`;
        let labelEn = `${item.lastName} ${item.firstName}`;
        object.label = language === LANGUAGES.EN ? labelEn : labelVi;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  handleChangeSelect = (selectedOption) => {
    this.setState({
      selectedDoctor: selectedOption,
    });
  };
  handleOnchangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleClickTimeButton = (time) => {
    time.isSelected = !time.isSelected;
    this.setState({
      selectedTime: !this.state.selectedTime,
    });
  };
  handleSaveSchedule = async () => {
    let result = [];
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    if (!currentDate) {
      toast.error("Invalid selected date");
    }
    if (!selectedDoctor) {
      toast.error("Invalid selected doctor");
      return;
    }
    let formattedDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formattedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid seleted time");
        return;
      }
    }
    let data = {
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      date: formattedDate,
    };
    let res = await saveScheduleDoctor(data);
    if (res.data.errCode === 0) {
      toast.success("Save schedule success");
    }
    console.log(res);
  };
  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id={"manage-schedule.title"} />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label htmlFor="doctor">
                <FormattedMessage id={"manage-schedule.select_doctor"} />
              </label>
              <Select
                id="doctor"
                placeholder="Select doctor..."
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
              />
            </div>
            <div className="col-6 form-group">
              <label htmlFor="date">
                <FormattedMessage id={"manage-schedule.select-date"} />
              </label>
              <DatePicker
                id="date"
                placeholder="Select date..."
                onChange={this.handleOnchangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
                minDate={new Date().setHours(0, 0, 0, 0)}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected ? "button-time active" : "button-time"
                      }
                      key={item.id}
                      onClick={() => this.handleClickTimeButton(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>

            <button
              className="save-button"
              onClick={() => this.handleSaveSchedule()}
            >
              <FormattedMessage id={"manage-schedule.save"} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    doctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAallScheduleTime: () => dispatch(actions.fetchAallScheduleTime()),
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
