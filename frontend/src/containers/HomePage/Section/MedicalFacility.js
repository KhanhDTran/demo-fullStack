import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



class MedicalFacility extends Component {

    render() {

        return (
            <div className="section-share section-medicalFacility">
                <div className='section-container'>
                    <div className='section-title'>
                        <h2>Cơ sở y tế nổi bật</h2>
                        <button>Tìm kiếm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-box'>
                                <img className='img-medicalFacility' />
                                <div>Bệnh viện  </div>
                            </div>
                            <div className='section-box'>
                                <img className='img-medicalFacility' />
                                <div>Bệnh viện  </div>
                            </div>
                            <div className='section-box'>
                                <img className='img-medicalFacility' />
                                <div>Bệnh viện  </div>
                            </div>
                            <div className='section-box'>
                                <img className='img-medicalFacility' />
                                <div>Bệnh viện  </div>
                            </div>
                            <div className='section-box'>
                                <img className='img-medicalFacility' />
                                <div>Bệnh viện  </div>
                            </div>
                            <div className='section-box'>
                                <img className='img-medicalFacility' />
                                <div>Bệnh viện  </div>
                            </div>
                            <div className='section-box'>
                                <img className='img-medicalFacility' />
                                <div>Bệnh viện  </div>
                            </div>
                            <div className='section-box'>
                                <img className='img-medicalFacility' />
                                <div>Bệnh viện  </div>
                            </div>

                        </Slider>
                    </div>
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
    connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
