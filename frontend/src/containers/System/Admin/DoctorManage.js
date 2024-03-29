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
      //model markdown
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      selectedDoctor: null,
      listDoctors: [],
      //save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: null,
      selectedPayment: null,
      selectedProvince: null,
      selectedClinic: null,
      selectedSpecialty: null,
      clinicName: "",
      clinicAddress: "",
      note: "",
      clinicId: "",
      specialtyId: "",
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
      let dataSelect = this.buildDataInputSelect(this.props.doctors, "users");
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
      input.forEach((item) => {
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
    let { listPayment, listPrice, listProvince } = this.state;
    if (
      res &&
      res.data &&
      res.data.errCode === 0 &&
      res.data.data.Markdown &&
      res.data.data.Doctor_info
    ) {
      let markdown = res.data.data.Markdown;
      let doctor_info = res.data.data.Doctor_info;
      let paymentId = listPayment.find(
        (item) => item.value === doctor_info.paymentId
      );
      let priceId = listPrice.find(
        (item) => item.value === doctor_info.priceId
      );
      let provinceId = listProvince.find(
        (item) => item.value === doctor_info.provinceId
      );
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        selectedPrice: priceId,
        selectedPayment: paymentId,
        selectedProvince: provinceId,
        clinicName: doctor_info.nameClinic,
        clinicAddress: doctor_info.addressClinic,
        note: doctor_info.note,
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
    let {
      clinicName,
      clinicAddress,
      note,
      contentMarkdown,
      description,
      selectedPrice,
      selectedPayment,
      selectedProvince,
    } = this.state;
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
              value={description ? description : ""}
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
              value={selectedPrice ? selectedPrice : {}}
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
              value={selectedPayment ? selectedPayment : {}}
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
              value={selectedProvince ? selectedProvince : {}}
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
              value={clinicName ? clinicName : ""}
              className="form-control"
              onChange={(e) => this.handleOnChangeInput(e)}
            />
          </div>
          {/* clinic name */}

          {/*clinic  address */}
          <div className="col-4 form-group">
            <label htmlFor="clinicAddress">
              {" "}
              <FormattedMessage id="admin.manage-doctor.clinic-address" />
            </label>
            <input
              value={clinicAddress ? clinicAddress : ""}
              id="clinicAddress"
              type="text"
              className="form-control"
              onChange={(e) => this.handleOnChangeInput(e)}
            />
            {/*clinic  address */}
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
              value={note ? note : ""}
              className="form-control"
              onChange={(e) => this.handleOnChangeInput(e)}
            />
            {/* address */}
          </div>
          <></>
        </div>

        <div className="row">
          <div className="form-group col-4">
            <label htmlFor="">Chọn chuyên khoa</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group col-4">
            <label htmlFor="">Chọn phòng khám </label>
            <input type="text" className="form-control" />
          </div>
        </div>
        {/* mark down */}
        <div className="manage-doctor-editor">
          <MdEditor
            value={contentMarkdown ? contentMarkdown : ""}
            style={{ height: "300px" }}
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
