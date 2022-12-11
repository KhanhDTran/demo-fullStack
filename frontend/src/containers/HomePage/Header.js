import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {

    render() {
        return (
            <div className='home-header-container'>
                <div className='header-left-content'>
                    <div className='menu'>
                        <i class="fa fa-bars" aria-hidden="true"></i>
                    </div>
                    <div className='logo'>

                    </div>
                </div>
                <div className='header-center-content'>
                    <h1>2</h1>
                </div>
                <div className='header-right-content'>
                    <h1>3</h1>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
