import * as actions from "../../../store/actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorManage.scss";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDoctorDetailInfo } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class DoctorManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      selectedDoctor: null,
      listDoctors: [],
      hasOldData: false,
      //save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: null,
      selectedlistPayment: null,
      selectedProvince: null,
      clinicName: "",
      clinicAddress: "",
      note: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchDoctorRequiredInfo();
  }

  componentDidUpdate(prevProps, preState, snapshot) {
    let { doctorPrice, doctorProvince, doctorPayment } =
      this.props.allDoctorRequiredInfo;
    if (prevProps.doctors !== this.props.doctors) {
      let dataSelect = this.buildDataInputSelect(this.props.doctors, "users");
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.doctors);
      this.setState({
        listDoctors: dataSelect,
        listPayment: this.buildDataInputSelect(doctorPayment),
        listPrice: this.buildDataInputSelect(doctorPrice),
        listProvince: this.buildDataInputSelect(doctorProvince),
      });
    }
    if (prevProps.allDoctorRequiredInfo !== this.props.allDoctorRequiredInfo) {
      this.setState({
        listPayment: this.buildDataInputSelect(doctorPayment),
        listPrice: this.buildDataInputSelect(doctorPrice),
        listProvince: this.buildDataInputSelect(doctorProvince),
      });
    }
  }

  buildDataInputSelect = (input, type) => {
    let result = [];
    let language = this.props.language;
    if (input && input.length > 0) {
      input.map((item, index) => {
        let object = {};
        let labelVi =
          type === "users"
            ? `${item.firstName} ${item.lastName}`
            : item.valueVi;
        let labelEn =
          type === "users"
            ? `${item.lastName} ${item.firstName}`
            : item.valueEn;
        object.label = language === LANGUAGES.EN ? labelEn : labelVi;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleSaveDoctorContent = () => {
    let { hasOldData } = this.state;
    if (this.state.selectedDoctor) {
      this.props.fetchSaveDoctorInfo({
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
        description: this.state.description,
        doctorId: this.state.selectedDoctor.value,
        action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      });
    }
    this.setState({
      hasOldData: true,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption }, () => {});
    let res = await getDoctorDetailInfo(selectedOption.value);

    if (res && res.data && res.data.errCode === 0 && res.data.data.Markdown) {
      let markdown = res.data.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    }
    if (!res.data.data.Markdown.description) {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
        hasOldData: false,
      });
    }
  };

  handleOnChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  render() {
    console.log(this.state);
    let { listPrice, listPayment, listProvince } = this.state;
    let { hasOldData } = this.state;
    return (
      <div className="doctor-manage-container">
        <div className="doctor-manage-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-infor">
          <div className="content-left">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              }
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
            />
          </div>
          <div className="content-right">
            <label htmlFor="description">
              {" "}
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>
            <textarea
              id="description"
              value={this.state.description}
              onChange={(e) => {
                this.handleOnChangeDescription(e);
              }}
              className="form-control"
              rows="4"
            ></textarea>
          </div>
        </div>
        <div className="doctor-info row">
          <div className="col-4 form-group">
            <label htmlFor="price">
              {" "}
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              id="doctor"
              placeholder="Select price..."
              // value={this.state.selectedDoctor}
              // onChange={this.handleChangeSelect}
              options={this.state.listPrice}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="pay-method">
              {" "}
              <FormattedMessage id="admin.manage-doctor.pay-method" />
            </label>
            <Select
              id="doctor"
              placeholder="Select pay method..."
              // value={this.state.selectedDoctor}
              // onChange={this.handleChangeSelect}
              options={this.state.listPayment}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="province">
              {" "}
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              id="doctor"
              placeholder="Select province..."
              // value={this.state.selectedDoctor}
              // onChange={this.handleChangeSelect}
              options={this.state.listProvince}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="clinic-name">
              {" "}
              <FormattedMessage id="admin.manage-doctor.clinic-name" />
            </label>
            <input id="clinic-name" type="text" className="form-control" />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="address">
              {" "}
              <FormattedMessage id="admin.manage-doctor.clinic-address" />
            </label>
            <input id="address" type="text" className="form-control" />
          </div>
          <Select
            id="doctor"
            placeholder="Select doctor..."
            value={this.state.selectedDoctor}
            onChange={this.handleChangeSelect}
            options={this.state.listDoctors}
          />
          <div className="col-4 form-group">
            <label htmlFor="note">
              {" "}
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input id="note" type="text" className="form-control" />
          </div>
          <></>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            value={this.state.contentMarkdown}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          onClick={() => {
            this.handleSaveDoctorContent();
          }}
          className="save-doctor-content btn btn-primary m-3"
        >
          <FormattedMessage id="admin.manage-doctor.save" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
    doctors: state.admin.allDoctors,
    language: state.app.language,
    allDoctorRequiredInfo: state.admin.allDoctorRequiredInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchDoctorRequiredInfo: () => dispatch(actions.fetchDoctorRequiredInfo()),
    fetchSaveDoctorInfo: (data) => dispatch(actions.fetchSaveDoctorInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
