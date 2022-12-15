import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import './HomePage.scss'
import Specialty from './Section/Specialty'
import HomeDoctor from './Section/HomeDoctor';
import MedicalFacility from './Section/MedicalFacility';
import Handbook from './Section/Handbook';
import About from './Section/About';
import HomeFooter from './HomeFooter';


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
                <HomeHeader isShowBanner={true} />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <HomeDoctor settings={settings} />
                <Handbook />
                <About />
                <HomeFooter />
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
