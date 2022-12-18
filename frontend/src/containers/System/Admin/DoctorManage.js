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
import { toast } from "react-toastify";

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
      selectedPayment: null,
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
        object.value = type === "users" ? item.id : item.keyMap;
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
    let {
      contentMarkdown,
      contentHTML,
      description,
      selectedDoctor,
      selectedPrice,
      selectedPayment,
      selectedProvince,
      clinicName,
      clinicAddress,
      note,
    } = this.state;
    let { hasOldData } = this.state;
    if (
      !contentMarkdown ||
      !contentHTML ||
      !description ||
      !selectedDoctor ||
      !selectedPrice ||
      !selectedPayment ||
      !selectedProvince ||
      !clinicName ||
      !clinicAddress
    ) {
      toast.error("Missing input!");
      return;
    }
    if (this.state.selectedDoctor) {
      this.props.fetchSaveDoctorInfo({
        contentHTML: contentHTML,
        contentMarkdown: contentMarkdown,
        description: description,
        doctorId: selectedDoctor.value,
        clinicName: clinicName,
        clinicAddress: clinicAddress,
        note: note,
        selectedPrice: selectedPrice.value,
        selectedPayment: selectedPayment.value,
        selectedProvince: selectedProvince.value,
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

  handleOnChangeSelectedDoctorInfo = async (selectedOption, name) => {
    let copyState = { ...this.state };
    copyState[name.name] = selectedOption;
    this.setState({ ...copyState }, () => {});
  };

  handleOnChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  handleOnChangeInput = (e) => {
    let copyState = { ...this.state };
    copyState[e.target.id] = e.target.value;
    this.setState({ ...copyState });
  };

  render() {
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
            {/* discription */}
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
            {/* discription */}
          </div>
        </div>
        <div className="doctor-info row">
          {/* price */}
          <div className="col-4 form-group">
            <label htmlFor="price">
              {" "}
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              name="selectedPrice"
              placeholder="Select price..."
              value={this.state.selectedPrice}
              onChange={this.handleOnChangeSelectedDoctorInfo}
              options={this.state.listPrice}
            />
            {/* price */}
          </div>
          {/* pay method */}
          <div className="col-4 form-group">
            <label htmlFor="pay-method">
              {" "}
              <FormattedMessage id="admin.manage-doctor.pay-method" />
            </label>
            <Select
              name="selectedPayment"
              placeholder="Select pay method..."
              value={this.state.selectedPayment}
              onChange={this.handleOnChangeSelectedDoctorInfo}
              options={this.state.listPayment}
            />
            {/* pay method */}
          </div>
          {/* province */}
          <div className="col-4 form-group">
            <label htmlFor="province">
              {" "}
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              name="selectedProvince"
              placeholder="Select province..."
              value={this.state.selectedProvince}
              onChange={this.handleOnChangeSelectedDoctorInfo}
              options={this.state.listProvince}
            />
            {/* province */}
          </div>
          {/* clinic name */}
          <div className="col-4 form-group">
            <label htmlFor="clinic-name">
              {" "}
              <FormattedMessage id="admin.manage-doctor.clinic-name" />
            </label>
            <input
              id="clinicName"
              type="text"
              className="form-control"
              onChange={(e) => this.handleOnChangeInput(e)}
            />
          </div>
          {/* clinic name */}

          {/* address */}
          <div className="col-4 form-group">
            <label htmlFor="address">
              {" "}
              <FormattedMessage id="admin.manage-doctor.clinic-address" />
            </label>
            <input
              id="clinicAddress"
              type="text"
              className="form-control"
              onChange={(e) => this.handleOnChangeInput(e)}
            />
            {/* address */}
          </div>

          {/* note */}
          <div className="col-4 form-group">
            <label htmlFor="note">
              {" "}
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              id="note"
              type="text"
              className="form-control"
              onChange={(e) => this.handleOnChangeInput(e)}
            />
            {/* address */}
          </div>
          <></>
        </div>
        {/* mark down */}
        <div className="manage-doctor-editor">
          <MdEditor
            value={this.state.contentMarkdown}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
          {/* address */}
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
