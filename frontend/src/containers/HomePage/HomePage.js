import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import './HomePage.scss'
import Specialty from './Section/Specialty'
import Doctor from './Section/Doctor';
import Medical from './Section/Medical';



class HomePage extends Component {



    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4
        };
        return (
            <div>
                <HomeHeader />
                <Specialty settings={settings} />
                <Medical settings={settings} />
                <Doctor settings={settings} />

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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
