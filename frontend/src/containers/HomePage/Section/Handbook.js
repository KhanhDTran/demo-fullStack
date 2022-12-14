import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



class Handbook extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2
        };
        return (
            <div className="section-share section-handbook">
                <div className='section-container'>
                    <div className='section-title'>
                        <h2>Cẩm nang</h2>
                        <button>Tìm kiếm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='section-box'>

                                <div className='img-handbook'></div>
                                <div className="position text-center">
                                    <div>Cẩm nang    </div>
                                </div>
                            </div>
                            <div className='section-box'>
                                <div className='img-handbook'></div>
                                <div className="position text-center">
                                    <div>Cẩm nang    </div>
                                </div>
                            </div>
                            <div className='section-box'>
                                <div className='img-handbook'></div>
                                <div className="position text-center">
                                    <div>Cẩm nang    </div>
                                </div>
                            </div>
                            <div className='section-box'>
                                <div className='img-handbook'></div>
                                <div className="position text-center">
                                    <div>Cẩm nang    </div>

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
    };
};

export default
    connect(mapStateToProps, mapDispatchToProps)(Handbook);
