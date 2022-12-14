import * as actions from "../../../store/actions"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableUserManage.scss'


class TableUserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            uesrsRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux()
    }

    componentDidUpdate(prevProps, preState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                uesrsRedux: this.props.users
            })
        }
    }

    updateUser = (user) => {
        this.props.editUser(user)
    }

    deleteUser = (user) => {
        this.props.deleteUser(user.id)

    }

    render() {
        let users = this.state.uesrsRedux
        return (
            <div className='container mb-5'>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Gender</th>
                            <th>Role</th>
                            <th>Position</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((item, index) => {
                            return (
                                <tr>
                                    <th>{item.email}</th>
                                    <th>{item.firstName}</th>
                                    <th>{item.lastName}</th>
                                    <th>{item.address}</th>
                                    <th>{item.phoneNumber}</th>
                                    <th>{item.gender}</th>
                                    <th>{item.roleId}</th>
                                    <th>{item.positionId}</th>
                                    <th>{item.image}</th>
                                    <th><button onClick={() => this.updateUser(item)}>update</button>
                                        <button onClick={() => this.deleteUser(item)}>Delete</button>
                                    </th>
                                </tr>
                            )
                        }
                        )}

                    </tbody>
                </table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUser()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserManage);
