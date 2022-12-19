import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalBooking.scss";
import { Button, ModalBody, ModalFooter } from "reactstrap";

class ModalBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, preState, snapshot) {
    if (prevProps.openModal !== this.props.openModal) {
      this.setState({
        modal: !this.state.modal,
      });
    }
  }
  saveBookingModal = () => {
    this.props.toggle();
  };

  render() {
    console.log("--------", this.props);
    return (
      <>
        <ModalBody>
          <div className="modal-booking-container">
            {/* {JSON.stringify(this.props.bookingData)} */}
            <div className="doctor-info"></div>
            <div className="price">Giá khám 500.000VNĐ</div>
            <div className="row">
              {/* Họ tên */}
              <div className="col-6 form-group">
                <label htmlFor="name">Họ tên</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Họ tên..."
                />
              </div>
              {/* Số điện thoại */}
              <div className="col-6 form-group">
                <label htmlFor="phoneNumber">Số điện thoại</label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="form-control"
                  placeholder="Số điện thoại..."
                />
              </div>
              {/* Địa chỉ email */}
              <div className="col-6 form-group">
                <label htmlFor="email">Địa chỉ email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Email..."
                />
              </div>
              {/* Địa chỉ liên hệ */}
              <div className="col-6 form-group">
                <label htmlFor="address">Địa chỉ liên hệ</label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  placeholder="Địa chỉ liên hệ..."
                />
              </div>
              {/* Lý do khám */}
              <div className="col-12 form-group">
                <label htmlFor="reason">Lý do khám</label>
                <input
                  type="text"
                  id="reason"
                  className="form-control"
                  placeholder="Lý do khám..."
                />
              </div>
              {/* Đặt cho ai */}
              <div className="col-6 form-group">
                <label htmlFor="who-booking">Đặt cho ai</label>
                <input
                  type="text"
                  id="who-booking"
                  className="form-control"
                  placeholder="Đặt cho ai..."
                />
              </div>
              {/* Giới tính */}
              <div className="col-6 form-group">
                <label htmlFor="gender">Giới tính</label>
                <input
                  type="text"
                  id="gender"
                  className="form-control"
                  placeholder="Giới tính..."
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.saveBookingModal()}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={this.props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);
