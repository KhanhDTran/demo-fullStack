import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './specialty.scss'



class Medical extends Component {

    render() {
        return (
            <div className='section-container'>
                <div>

                    <h2>Bệnh viện phổ biến</h2>
                </div>


                <Slider {...this.props.settings}>
                    <div className='medical-customize'>
                        <div class='bg-img'></div>
                        <h5>Bệnh viện 1</h5>
                    </div>
                    <div className='medical-customize'>
                        <div class='bg-img'></div>
                        <h5>Bệnh viện 2</h5>
                    </div>
                    <div className='medical-customize'>
                        <div class='bg-img'></div>
                        <h5>Bệnh viện 3</h5>
                    </div>
                    <div className='medical-customize'>
                        <div class='bg-img'></div>
                        <h5>Bệnh viện 4</h5>
                    </div>
                    <div className='medical-customize'>
                        <div class='bg-img'></div>
                        <h5>Bệnh viện 5</h5>
                    </div>
                    <div className='medical-customize'>
                        <div class='bg-img'></div>
                        <h5>Bệnh viện 6</h5>
                    </div>
                </Slider>
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
    connect(mapStateToProps, mapDispatchToProps)(Medical);
