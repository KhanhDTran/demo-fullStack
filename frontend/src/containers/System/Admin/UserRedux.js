import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from "../../../store/actions"
class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: []
        }
    }

    async componentDidMount() {

        this.props.getGenderStart()
    }
    render() {
        let genders = this.props.genderRedux
        let roles = this.state.roleArr
        let positions = this.state.positionArr
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
                                <input className='form-control' type='email'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password' /></label>
                                <input className='form-control' type='password'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.first-name' /></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.last-name' /></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phone-number' /></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address' /></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label htmlFor="inputState"><FormattedMessage id='manage-user.gender' /></label>
                                <select id="inputState" className="form-control">
                                    <option value>Choose...</option>
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index}>{language === LANGUAGES.EN ? item.valueEn : item.valueVi}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label htmlFor="inputState"><FormattedMessage id='manage-user.role' /></label>
                                <select id="inputState" className="form-control">
                                    <option value>Choose...</option>
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            <option key={index}>{language === LANGUAGES.EN ? item.valueEn : item.valueVi}</option>
                                        )
                                    })}
                                    <option>...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label htmlFor="inputState"><FormattedMessage id='manage-user.position' /></label>
                                <select id="inputState" className="form-control">
                                    <option value>Choose...</option>
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index}>{language === LANGUAGES.EN ? item.valueEn : item.valueVi}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label htmlFor="inputState"><FormattedMessage id='manage-user.image' /></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <button className='btn btn-primary mt-3 '>Save</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders
    };
};
const mapDispatchToProps = dispatch => {
    return {
        // changeLanguage: (language) => dispatch(changeLanguage(language))
        getGenderStart: () => dispatch(actions.fetchGenderStart())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
