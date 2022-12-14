import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as actions from '../../../store/actions'


class Doctor extends Component {

    componentDidMount() {
        this.props.loadTopDoctors()
    }

    render() {

        return (
            <div className="section-share section-doctor">
                <div className='section-container'>
                    <div className='section-title'>
                        <h2>Bác sĩ nổi bật</h2>
                        <button>Tìm kiếm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-box'>
                                <div className="section-container">
                                    <div className='img-doctor-container'>
                                        <img alt='' className='img-doctor' />
                                    </div>
                                    <div className="position text-center">
                                        <div>Bác sĩ   </div>
                                        <div>Chuyên khoa</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-box'>
                                <div className="section-container">
                                    <div className='img-doctor-container'>
                                        <img alt='' className='img-doctor' />
                                    </div>
                                    <div className="position text-center">
                                        <div>Bác sĩ   </div>
                                        <div>Chuyên khoa</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-box'>
                                <div className="section-container">
                                    <div className='img-doctor-container'>
                                        <img alt='' className='img-doctor' />
                                    </div>
                                    <div className="position text-center">
                                        <div>Bác sĩ   </div>
                                        <div>Chuyên khoa</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-box'>
                                <div className='img-doctor-container'>
                                    <img alt='' className='img-doctor' />
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ   </div>
                                    <div>Chuyên khoa</div>
                                </div>
                            </div>
                            <div className='section-box'>
                                <div className='img-doctor-container'>
                                    <img alt='' className='img-doctor' />
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ   </div>
                                    <div>Chuyên khoa</div>
                                </div>
                            </div>
                            <div className='section-box'>
                                <div className='img-doctor-container'>
                                    <img alt='' className='img-doctor' />
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ   </div>
                                    <div>Chuyên khoa</div>
                                </div>
                            </div>
                            <div className='section-box'>
                                <div className='img-doctor-container'>
                                    <img alt='' className='img-doctor' />
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ   </div>
                                    <div>Chuyên khoa</div>
                                </div>
                            </div>
                            <div className='section-box'>
                                <div className='img-doctor-container'>
                                    <img alt='' className='img-doctor' />
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ   </div>
                                    <div>Chuyên khoa</div>
                                </div>
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
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors())
    };
};

export default
    connect(mapStateToProps, mapDispatchToProps)(Doctor);
