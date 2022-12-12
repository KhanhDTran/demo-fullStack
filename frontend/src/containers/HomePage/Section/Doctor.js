import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './specialty.scss'

class Doctor extends Component {

    render() {
        return (
            <div className='section-container'>
                <div >
                    <h2>Bác sĩ phổ biến</h2>
                </div>
                <div>
                    <Slider {...this.props.settings}>
                        <div className='doctor-customize'>
                            <div class='bg-img'></div>
                            <h5>Bác sĩ 1</h5>
                        </div>
                        <div className='doctor-customize'>
                            <div class='bg-img'></div>
                            <h5>Bác sĩ 2</h5>
                        </div>
                        <div className='doctor-customize'>
                            <div class='bg-img'></div>
                            <h5>Bác sĩ 3</h5>
                        </div>
                        <div className='doctor-customize'>
                            <div class='bg-img'></div>
                            <h5>Bác sĩ 4</h5>
                        </div>
                        <div className='doctor-customize'>
                            <div class='bg-img'></div>
                            <h5>Bác sĩ 5</h5>
                        </div>
                        <div className='doctor-customize'>
                            <div class='bg-img'></div>
                            <h5>Bác sĩ 6</h5>
                        </div>
                    </Slider>
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

export default
    connect(mapStateToProps, mapDispatchToProps)(Doctor);
