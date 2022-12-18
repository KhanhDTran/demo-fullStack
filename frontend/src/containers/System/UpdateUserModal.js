import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
class UpdateUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: this.props.user.email,
      password: "hardcode",
      phoneNumber: this.props.user.phoneNumber,
      address: this.props.user.address,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleInputChange = (e) => {
    let copyState = { ...this.state };
    copyState[e.target.id] = e.target.value;
    this.setState({ ...copyState });
  };

  saveUpdateForm = async () => {
    let check = this.checkInput();
    if (check) {
      alert("Please enter " + check);
    } else {
      let response = await this.props.updateUser(
        this.props.user.id,
        this.state.email,
        this.state.address,
        this.state.firstName,
        this.state.lastName,
        this.state.phoneNumber
      );
      if (response) {
        this.props.toggle();
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
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          className={this.props.className}
          size="lg"
          centered
        >
          <ModalHeader toggle={this.props.toggle}>Update user</ModalHeader>
          <ModalBody>
            <div className="input-group">
              <div className="input-container">
                <label for="email">Email</label>
                <input
                  type="email"
                  placeholder="Email..."
                  id="email"
                  disabled="true"
                  value={this.state.email}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </div>
              <div className="input-container">
                <label for="password">Password</label>
                <input
                  type="password"
                  placeholder="Password..."
                  disabled="true"
                  id="password"
                  value="hardcode"
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
            <Button color="primary" onClick={this.saveUpdateForm}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={this.props.toggle}>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserModal);
