import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      firstName: "",
      lastName: "",
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      firstName: "",
      lastName: "",
    });
  };

  handleInputChange = (e) => {
    let copyState = { ...this.state };
    copyState[e.target.id] = e.target.value;
    this.setState({ ...copyState });
  };

  saveCreateForm = async () => {
    let check = this.checkInput();
    if (check) {
      alert("Please enter " + check);
    } else {
      let response = await this.props.createNewUser(
        this.state.email,
        this.state.password,
        this.state.address,
        this.state.firstName,
        this.state.lastName,
        this.state.phoneNumber
      );
      if (response) {
        this.toggle();
      }
    }
  };

  checkInput = () => {
    let arrInput = [
      "email",
      "password",
      "phoneNumber",
      "address",
      "firstName",
      "lastName",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        return arrInput[i];
      }
    }
    return "";
  };

  render() {
    return (
      <div>
        <button
          type="button"
          className="create-user-btn"
          data-toggle="modal"
          onClick={this.toggle}
          data-target="#exampleModal"
        >
          Create user
        </button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          size="lg"
          centered
        >
          <ModalHeader toggle={this.toggle}>Create new user</ModalHeader>
          <ModalBody>
            <div className="input-group">
              <div className="input-container">
                <label for="email">Email</label>
                <input
                  type="email"
                  placeholder="Email..."
                  id="email"
                  value={this.state.email}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </div>
              <div className="input-container">
                <label for="password">Password</label>
                <input
                  type="password"
                  placeholder="Password..."
                  id="password"
                  value={this.state.password}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </div>
            </div>
            <div className="input-group">
              <div className="input-container">
                <label for="firstName">First name</label>
                <input
                  type="text"
                  placeholder="First name..."
                  id="firstName"
                  value={this.state.firstName}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </div>
              <div className="input-container">
                <label for="lastName">Last name</label>
                <input
                  type="text"
                  placeholder="Last name..."
                  id="lastName"
                  value={this.state.lastName}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </div>
            </div>
            <div className="input-group">
              <div className="input-container">
                <label for="address">Address</label>
                <input
                  type="text"
                  placeholder="Address..."
                  id="address"
                  value={this.state.address}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </div>
              <div className="input-container">
                <label for="phoneNumber">Phone number</label>
                <input
                  type="tel"
                  placeholder="Phone number..."
                  id="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.saveCreateForm}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
