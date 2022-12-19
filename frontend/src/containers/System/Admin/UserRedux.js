import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableUserManage from "./TableUserManage";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      genderArr: [],
      roleArr: [],
      positionArr: [],
      previewImgUrl: "",
      isOpen: false,
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      firstName: "",
      lastName: "",
      gender: "",
      role: "",
      position: "",
      image: "",
      action: "",
    };
  }
  handleEditUser = (user) => {
    let imgBase64 = "";
    if (user.image) {
      imgBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      id: user.id,
      email: user.email,
      password: "hardcode",
      phoneNumber: user.phoneNumber,
      address: user.address,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      previewImgUrl: imgBase64,
      action: CRUD_ACTIONS.EDIT,
      image: imgBase64,
    });
    console.log(this.state.previewImgUrl);
  };

  editUser = () => {
    let data = {
      id: this.state.id,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gender: this.state.gender,
      role: this.state.role,
      position: this.state.position,
      image: this.state.image,
    };
    this.props.editUser(data);
    this.setState({
      action: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      firstName: "",
      lastName: "",
      gender: "",
      role: "",
      position: "",
      image: "",

      previewImgUrl: "",
    });
  };

  componentDidMount() {
    this.props.getPositionStart();
    this.props.getRoleStart();
    this.props.getGenderStart();
    this.setState({
      genderArr: this.props.genderRedux,
      roleArr: this.props.rolesRedux,
      positionArr: this.props.positionRedux,
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.rolesRedux !== this.props.rolesRedux) {
      let arrRoles = this.props.rolesRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let positionArr = this.props.positionRedux;
      this.setState({
        positionArr: positionArr,
        position:
          positionArr && positionArr.length > 0 ? positionArr[0].keyMap : "",
      });
    }
    if (prevProps.users !== this.props.users) {
      this.setState(
        {
          email: "",
          password: "",
          phoneNumber: "",
          address: "",
          firstName: "",
          lastName: "",
          gender: "",
          role: "",
          position: "",
          image: "",
        },
        () => {}
      );
    }
  }

  handleImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState(
        {
          previewImgUrl: URL.createObjectURL(file),
          image: base64,
        },
        () => {}
      );
    }
  };

  openImagePreview = () => {
    if (this.state.previewImgUrl) {
      this.setState({
        isOpen: true,
      });
    } else {
      return;
    }
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateinput();
    if (isValid === false) return;
    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      image: this.state.image,
      roleId: this.state.role,
      positionId: this.state.position,
    });
    this.setState({
      previewImgUrl: "",
    });
  };

  checkValidateinput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("Missing: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  handleOnchangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({ ...copyState }, () => {});
  };

  render() {
    let genders = this.props.genderRedux;
    let roles = this.props.rolesRedux;
    let positions = this.props.positionRedux;
    let language = this.props.language;

    return (
      <div className="user-redux-container">
        <div className="title">User Redux</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                {this.state.action === CRUD_ACTIONS.EDIT && (
                  <span>Edit user</span>
                )}
                {this.state.action !== CRUD_ACTIONS.EDIT && (
                  <span>
                    {" "}
                    <FormattedMessage id="manage-user.add" />
                  </span>
                )}
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  className="form-control"
                  type="email"
                  value={this.state.email}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                  onChange={(e) => this.handleOnchangeInput(e, "email")}
                  name="email"
                ></input>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={this.state.password}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                  onChange={(e) => this.handleOnchangeInput(e, "password")}
                  name="password"
                ></input>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.firstName}
                  onChange={(e) => this.handleOnchangeInput(e, "firstName")}
                  name="firstName"
                ></input>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.lastName}
                  onChange={(e) => this.handleOnchangeInput(e, "lastName")}
                  name="lastName"
                ></input>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.phoneNumber}
                  onChange={(e) => this.handleOnchangeInput(e, "phoneNumber")}
                  name="phoneNumber"
                ></input>
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.address}
                  onChange={(e) => this.handleOnchangeInput(e, "address")}
                  name="address"
                ></input>
              </div>
              <div className="col-3">
                <label htmlFor="inputState">
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  value={this.state.gender}
                  id="inputState"
                  className="form-control"
                  onChange={(e) => this.handleOnchangeInput(e, "gender")}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.EN
                            ? item.valueEn
                            : item.valueVi}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label htmlFor="inputState">
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  value={this.state.role}
                  id="inputState"
                  className="form-control"
                  onChange={(e) => this.handleOnchangeInput(e, "role")}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.EN
                            ? item.valueEn
                            : item.valueVi}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label htmlFor="inputState">
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  value={this.state.position}
                  id="inputState"
                  className="form-control"
                  onChange={(e) => this.handleOnchangeInput(e, "position")}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.EN
                            ? item.valueEn
                            : item.valueVi}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label htmlFor="inputState">
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-continer">
                  <input
                    type="file"
                    hidden="true"
                    id="imagePreview"
                    onChange={(e) => this.handleImage(e)}
                  />
                  <label className="label-upload" htmlFor="imagePreview">
                    <i className="fa fa-upload" aria-hidden="true">
                      <FormattedMessage id="manage-user.upload" />
                    </i>
                  </label>
                  <div
                    className="preview-image"
                    onClick={() => this.openImagePreview()}
                    name=""
                    style={{
                      backgroundImage: `url(${this.state.previewImgUrl})`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-3">
                {this.state.action === CRUD_ACTIONS.EDIT && (
                  <button
                    className="btn btn-primary mt-3 "
                    onClick={() => {
                      this.editUser();
                    }}
                  >
                    Save changes
                  </button>
                )}
                {this.state.action !== CRUD_ACTIONS.EDIT && (
                  <button
                    className="btn btn-primary mt-3 "
                    onClick={() => {
                      this.handleSaveUser();
                    }}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}

        <TableUserManage
          action={this.state.action}
          editUser={this.handleEditUser}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    rolesRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    users: state.admin.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    editUser: (data) => dispatch(actions.editUser(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
