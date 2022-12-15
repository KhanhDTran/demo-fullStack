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
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
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
    console.log(this.state.hasOldData);
    let { hasOldData } = this.state;
    return (
      <div className="doctor-manage-container">
        <div className="doctor-manage-title">Tạo thêm thông tin bác sĩ</div>
        <div className="more-infor">
          <div className="content-left">
            <label>Chọn bác sĩ</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
            />
          </div>
          <div className="content-right">
            <label>Thông tin giới thiệu</label>
            <textarea
              value={this.state.description}
              onChange={(e) => {
                this.handleOnChangeDescription(e);
              }}
              className="form-control"
              rows="4"
            ></textarea>
          </div>
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
          {hasOldData === true ? (
            <span>Lưu thông tin</span>
          ) : (
            <span>Tạo thông tin</span>
          )}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchSaveDoctorInfo: (data) => dispatch(actions.fetchSaveDoctorInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
