import React, { Component } from 'react';
import { connect } from 'react-redux';
import './specialty.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



class Specialty extends Component {

    render() {
        return (
            <div className='section-container'>
                <div >
                    <h2>Chuyên khoa phổ biến</h2>
                </div>
                <div >
                    <Slider {...this.props.settings} >
                        <div className='specialty-customize'>
                            <div class='bg-img'></div>
                            <h5>Cơ xương khớp 1</h5>
                        </div>
                        <div className='specialty-customize'>
                            <div class='bg-img'></div>
                            <h5>Cơ xương khớp 2</h5>
                        </div>
                        <div className='specialty-customize'>
                            <div class='bg-img'></div>
                            <h5>Cơ xương khớp 3</h5>
                        </div>
                        <div className='specialty-customize'>
                            <div class='bg-img'></div>
                            <h5>Cơ xương khớp 4</h5>
                        </div>
                        <div className='specialty-customize'>
                            <div class='bg-img'></div>
                            <h5>Cơ xương khớp 5</h5>
                        </div>
                        <div className='specialty-customize'>
                            <div class='bg-img'></div>
                            <h5>Cơ xương khớp 6</h5>
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
    connect(mapStateToProps, mapDispatchToProps)(Specialty);
