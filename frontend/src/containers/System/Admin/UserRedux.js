import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from "../../../store/actions"
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImgUrl: "",
            isOpen: false,
            email: '',
            password: '',
            phoneNumber: '',
            address: '',
            firstName: '',
            lastName: '',
            gender: '',
            role: '',
            position: '',
            image: ''
        }
    }

    componentDidMount() {
        this.props.getPositionStart()
        this.props.getRoleStart()
        this.props.getGenderStart()
        this.setState({
            genderArr: this.props.genderRedux,
            roleArr: this.props.rolesRedux,
            positionArr: this.props.positionRedux,

        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        if (prevProps.rolesRedux !== this.props.rolesRedux) {
            let arrRoles = this.props.rolesRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let positionArr = this.props.genderRedux
            this.setState({
                positionArr: positionArr,
                position: positionArr && positionArr.length > 0 ? positionArr[0].key : ''
            })
        }
    }


    handleImage = (e) => {
        if (e.target.files) {
            let objectUrl = URL.createObjectURL(e.target.files[0])
            this.setState({
                previewImgUrl: objectUrl,
                image: e.target.files[0]
            })
        }
    }

    openImagePreview = () => {
        if (this.state.previewImgUrl) {
            this.setState({
                isOpen: true
            })
        } else {
            return
        }
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateinput()
        if (isValid === false) return
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
            positionId: this.state.position
        })
    }

    checkValidateinput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert('Missing: ' + arrCheck[i])
                break
            }
        }
        return isValid
    }

    handleOnchangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({ ...copyState }, () => { })
    }

    render() {
        let genders = this.props.genderRedux
        let roles = this.props.rolesRedux
        let positions = this.props.positionRedux
        let language = this.props.language


        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Redux
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id='manage-user.add' /></div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.email' /></label>
                                <input className='form-control' type='email'
                                    onChange={(e) => this.handleOnchangeInput(e, 'email')} name='email' ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password' /></label>
                                <input className='form-control' type='password'
                                    onChange={(e) => this.handleOnchangeInput(e, 'password')} name='password' ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.first-name' /></label>
                                <input className='form-control' type='text'
                                    onChange={(e) => this.handleOnchangeInput(e, 'firstName')} name='firstName' ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.last-name' /></label>
                                <input className='form-control' type='text'
                                    onChange={(e) => this.handleOnchangeInput(e, 'lastName')} name='lastName' ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phone-number' /></label>
                                <input className='form-control' type='text'
                                    onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')} name='phoneNumber' ></input>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address' /></label>
                                <input className='form-control' type='text'
                                    onChange={(e) => this.handleOnchangeInput(e, 'address')} name='address'></input>
                            </div>
                            <div className='col-3'>
                                <label htmlFor="inputState"><FormattedMessage id='manage-user.gender'
                                /></label>
                                <select value={this.state.genderArr[0]} id="inputState" className="form-control" onChange={(e) => this.handleOnchangeInput(e, 'gender')}>
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.EN ? item.valueEn : item.valueVi}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label htmlFor="inputState"><FormattedMessage id='manage-user.role'
                                /></label>
                                <select value={this.state.roleArr[0]} id="inputState" className="form-control" onChange={(e) => this.handleOnchangeInput(e, 'role')}>
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.EN ? item.valueEn : item.valueVi}</option>
                                        )
                                    })}

                                </select>
                            </div>
                            <div className='col-3'>
                                <label htmlFor="inputState"><FormattedMessage id='manage-user.position'
                                /></label>
                                <select value={this.state.positionArr[0]} id="inputState" className="form-control" onChange={(e) => this.handleOnchangeInput(e, 'position')}>
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.EN ? item.valueEn : item.valueVi}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label htmlFor="inputState"><FormattedMessage id='manage-user.image' /></label>
                                <div className='preview-img-continer'>
                                    <input type="file" hidden='true' id='imagePreview'
                                        onChange={(e) => this.handleImage(e)} />
                                    <label className='label-upload' htmlFor="imagePreview">
                                        <i class="fa fa-upload" aria-hidden="true" >
                                            <FormattedMessage id='manage-user.upload' /></i></label>
                                    <div className="preview-image" onClick={() => this.openImagePreview()} name=''
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}></div>
                                </div>
                            </div>
                            <div className='col-3'>
                                <button className='btn btn-primary mt-3 ' onClick={() => { this.handleSaveUser() }}>Save</button>
                            </div>

                        </div>
                    </div>
                </div>
                {this.state.isOpen && (
                    <Lightbox mainSrc={(this.state.previewImgUrl)}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        rolesRedux: state.admin.roles,
        positionRedux: state.admin.positions,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        // changeLanguage: (language) => dispatch(changeLanguage(language))
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
