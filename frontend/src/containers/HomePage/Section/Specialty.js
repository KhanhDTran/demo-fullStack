import React, { Component } from "react";
import { connect } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.data.errCode === 0) {
      this.setState({ dataSpecialty: res.data.data });
    }
  }

  render() {
    let { dataSpecialty } = this.state;
    console.log(dataSpecialty);
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-title">
            <h2>Chuyên khoa phổ biến</h2>
            <button>Xem Thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div className="section-box" key={index}>
                      {/* <img alt="" className="img-specialty" /> */}
                      <div
                        className="img-specialty"
                        style={{
                          backgroundImage: `url(${
                            item.image ? item.image : ""
                          })`,
                        }}
                      ></div>
                      <div>{item.name}</div>
                    </div>
                  );
                })}
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
