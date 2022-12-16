import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: null,
      currentDate: "",
      rangeTime: [],
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
                onChange={this.handleOnchangeDatePicker}
                className="form-control"
                value={this.state.currentDate[0]}
                minDate={new Date()}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button className="btn btn-success" key={item.id}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button className="btn btn-primary">
                <FormattedMessage id={"manage-schedule.save"} />
              </button>
            </div>
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
