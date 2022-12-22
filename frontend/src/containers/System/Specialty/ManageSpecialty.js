import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imgBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, preState, snapshot) {}

  handleOnChangeInput = (e) => {
    if (e.target.id === "name") {
      this.setState({ name: e.target.value });
    }
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleSaveSpecialty = async () => {
    console.log(this.state);
    let res = await createNewSpecialty(this.state);
    if (res && res.data.errCode === 0) {
      toast.success("Create specialty success");
    } else {
      toast.error("Create speacilty fail");
      console.log(res.data);
    }
  };

  render() {
    let { name, imgBase64, descriptionHTML, descriptionMarkdown } = this.state;
    return (
      <>
        <div className="manage-specialy-container">
          <div className="ms-title">Quản lý chuyên khoa</div>

          <div className="add-new-special-container row">
            <div className="col-6 form-group">
              <label htmlFor="">Tên chuyên khoa</label>
              <input
                id="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => this.handleOnChangeInput(e)}
              />
            </div>
            <div className="col-6 form-group">
              <label htmlFor="">Ảnh chuyên khoa</label>
              <input
                type="file"
                className="form-control-file"
                onChange={(e) => this.handleImage(e)}
              />
            </div>
            <div className="col-12">
              <MdEditor
                value={descriptionMarkdown ? descriptionMarkdown : ""}
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
              />
            </div>
            <div className="col-12">
              <button
                className="btn-save-specialty btn btn-primary"
                onClick={() => this.handleSaveSpecialty()}
              >
                Save
              </button>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
