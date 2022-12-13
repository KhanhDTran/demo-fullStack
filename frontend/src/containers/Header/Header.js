import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { changeLanguage } from '../../store/actions/adminActions';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from "../../utils"

class Header extends Component {


    changeLanguage = (language) => {
        this.props.changeLanguage(language)
    }
    render() {
        let language = this.props.language
        const { processLogout, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className='right-side-container'>

                    {/* nút logout */}
                    <div className='languages'>
                        <span className='welcome'><FormattedMessage id='homeHeader.welcome'></FormattedMessage > ,
                            {userInfo && this.props.userInfo.firstName ? this.props.userInfo.firstName : ""}  </span>
                        <span className={language === 'vi' ? 'language-vi active' : 'language-vi'}
                            onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                        <span className={language === 'en' ? 'language-en active' : 'language-en'}
                            onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                    </div>
                    <div className="btn btn-logout" title='log-out' onClick={processLogout}>

                        <i className="fas fa-sign-out-alt"></i>

                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguage: (language) => dispatch(changeLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
