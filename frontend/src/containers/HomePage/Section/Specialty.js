import React, { Component } from "react";
import { connect } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

class Specialty extends Component {
  render() {
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-title">
            <h2>Chuyên khoa phổ biến</h2>
            <button>Xem Thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-box">
                <img alt="" className="img-specialty" />
                <div>Cơ xương khớp </div>
              </div>
              <div className="section-box">
                <img alt="" className="img-specialty" />
                <div>Cơ xương khớp </div>
              </div>
              <div className="section-box">
                <img alt="" className="img-specialty" />
                <div>Cơ xương khớp </div>
              </div>
              <div className="section-box">
                <img alt="" className="img-specialty" />
                <div>Cơ xương khớp </div>
              </div>
              <div className="section-box">
                <img alt="" className="img-specialty" />
                <div>Cơ xương khớp </div>
              </div>
              <div className="section-box">
                <img alt="" className="img-specialty" />
                <div>Cơ xương khớp </div>
              </div>
              <div className="section-box">
                <img alt="" className="img-specialty" />
                <div>Cơ xương khớp </div>
              </div>
              <div className="section-box">
                <img alt="" className="img-specialty" />
                <div>Cơ xương khớp </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
