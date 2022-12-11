import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getUsersApi, createUserApi, deleteUserApi, updateUserApi } from '../../services/userService';

import UserModal from './UserModal';

class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],

        }
    }

    getUsers = async () => {
        let response = await getUsersApi()
        if (response.data.errCode === 0) {
            this.setState({
                users: response.data.users
            })

        }
    }

    createNewUser = async (email, password, address, firstName, lastName, phoneNumber) => {
        let response = await createUserApi(email, password, address, firstName, lastName, phoneNumber)
        console.log(response.data.message)
        alert(response.data.message)
        if (response.data.errCode === 0) {
            this.getUsers()
            return true
        } else {
            return false
        }
    }

    handleDeleteUser = async (user) => {
        // let response = await deleteUserApi(user.id)
        // alert(response.data.message)
        // if (response.data.errCode === 0) {
        //     this.getUsers()
        // }
    }
    handleUpdateUser = async (user) => {
        let response = await updateUserApi(user.id, user.email, user.address, user.firstName, user.lastName, user.phoneNumber)
        alert(response.data.message)
        if (response.data.errCode === 0) {
            this.getUsers()
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    render() {

        return (
            <div className='users-container' >
                <h2 className='title'> User Management</h2>
                <UserModal className='create-user-modal' createNewUser={this.createNewUser} />

                <div className='users-table'>
                    <table>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {this.state.users && this.state.users.map((item, index) => {
                            return (
                                <tr>
                                    <th>{item.email}</th>
                                    <th>{item.firstName}</th>
                                    <th>{item.lastName}</th>
                                    <th>{item.address}</th>
                                    <th><button onClick={() => this.handleUpdateUser(item)}>update</button>
                                        <button onClick={() => this.handleDeleteUser(item)}>Delete</button>
                                    </th>
                                </tr>
                            )
                        }
                        )}
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
