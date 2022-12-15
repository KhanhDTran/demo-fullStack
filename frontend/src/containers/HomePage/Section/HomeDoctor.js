import React, { Component } from "react";
import { connect } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class HomeDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(preProps, prevState, snapshot) {
    if (preProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrDoctors: this.props.topDoctors,
      });
    }
  }

  handleViewDoctorDetail = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/doctor-detail/${doctor.id}`);
    }
  };

  render() {
    let arrDoctors = this.state.arrDoctors;
    let language = this.props.language;
    return (
      <div className="section-share section-doctor">
        <div className="section-container">
          <div className="section-title">
            <h2>
              {" "}
              <FormattedMessage id="home-page.outstanding-doctors" />{" "}
            </h2>
            <button>
              <FormattedMessage id="home-page.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let img64 = "";
                  if (item.image) {
                    img64 = new Buffer(item.image, "base64").toString("binary");
                  }
                  let nameVi = `${item.positionData.valueVi} ${item.firstName} ${item.lastName}`;
                  let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`;

                  return (
                    <div className="section-box" key={index}>
                      <div className="section-container">
                        <div
                          className="img-doctor-container"
                          onClick={() => this.handleViewDoctorDetail(item)}
                        >
                          <div
                            className="img-doctor"
                            style={{
                              backgroundImage: `url(${img64 ? img64 : ""})`,
                            }}
                          />
                        </div>
                        <div
                          className="position text-center"
                          onClick={() => this.handleViewDoctorDetail(item)}
                        >
                          <div> {language === "vi" ? nameVi : nameEn}</div>
                          <div>Chuyên khoa</div>
                        </div>
                      </div>
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
    topDoctors: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctors()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeDoctor)
);
