import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getUsersApi,
  createUserApi,
  deleteUserApi,
  updateUserApi,
} from "../../services/userService";

import UserModal from "./UserModal";
import UpdateUserModal from "./UpdateUserModal";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      openUpdateModal: false,
      currentUser: {},
    };
  }

  getUsers = async () => {
    let response = await getUsersApi();
    if (response.data.errCode === 0) {
      this.setState({
        users: response.data.users,
      });
    }
  };

  createNewUser = async (
    email,
    password,
    address,
    firstName,
    lastName,
    phoneNumber
  ) => {
    let response = await createUserApi(
      email,
      password,
      address,
      firstName,
      lastName,
      phoneNumber
    );
    console.log(response.data.message);
    alert(response.data.message);
    if (response.data.errCode === 0) {
      this.getUsers();
      return true;
    } else {
      return false;
    }
  };

  handleDeleteUser = async (user) => {
    let response = await deleteUserApi(user.id);
    alert(response.data.message);
    if (response.data.errCode === 0) {
      this.getUsers();
      return true;
    } else {
      return false;
    }
  };
  openUpdateUserModal = async (user) => {
    this.setState(
      {
        openUpdateModal: !this.state.openUpdateModal,
        currentUser: user,
      },
      () => {}
    );
  };

  updateUser = async (id, email, address, firstName, lastName, phoneNumber) => {
    let response = await updateUserApi(
      id,
      email,
      address,
      firstName,
      lastName,
      phoneNumber
    );
    alert(response.data.message);
    if (response.data.errCode === 0) {
      this.getUsers();
      return true;
    } else {
      return false;
    }
  };

  toggleUpdateUserModal = () => {
    this.setState({ openUpdateModal: !this.state.openUpdateModal });
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div className="users-container">
        {this.state.openUpdateModal && (
          <UpdateUserModal
            className="update-user-modal"
            user={this.state.currentUser}
            isOpen={this.state.openUpdateModal}
            toggle={this.toggleUpdateUserModal}
            updateUser={this.updateUser}
          />
        )}
        <h2 className="title"> User Management</h2>
        <UserModal
          className="create-user-modal"
          createNewUser={this.createNewUser}
        />
        <div className="users-table">
          <table>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {this.state.users &&
              this.state.users.map((item, index) => {
                return (
                  <tr>
                    <th>{item.email}</th>
                    <th>{item.firstName}</th>
                    <th>{item.lastName}</th>
                    <th>{item.address}</th>
                    <th>
                      <button onClick={() => this.openUpdateUserModal(item)}>
                        update
                      </button>
                      <button onClick={() => this.handleDeleteUser(item)}>
                        Delete
                      </button>
                    </th>
                  </tr>
                );
              })}
          </table>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
