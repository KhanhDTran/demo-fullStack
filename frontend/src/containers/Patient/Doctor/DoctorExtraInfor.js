import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPriceTable: true,
    };
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, preState, snapshot) {}

  handleShowAndHide = () => {
    this.setState({ showPriceTable: !this.state.showPriceTable });
  };

  render() {
    let { showPriceTable } = this.state;
    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
          <div className="text-address">Địa chỉ khám</div>
          <div className="name-clinic">
            Phòng khám Bệnh viện Đại học Y Dược 1
          </div>
          <div className="detail-address">
            20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM
          </div>
        </div>
        <div className="content-down">
          <div className="price">
            GIÁ KHÁM: {!showPriceTable ? "50000" : ""}
          </div>
          <div className="price-table">
            {showPriceTable && (
              <>
                <div className="price-detail">
                  <div className="price-detail-left">Giá tư vấn 15p</div>
                  <div className="price-detail-right">250.000d</div>
                </div>
                <div className="price-detail">
                  <div className="price-detail-left">Giá tư vấn 30p</div>
                  <div className="price-detail-right">500.000d</div>
                </div>
                <div className="pay-method">
                  Phòng khám có thanh toán bằng hình thức tiền mặt và quẹt thẻ
                </div>
              </>
            )}
          </div>
          <div>
            <span
              className="show-hide-price-table"
              onClick={() => {
                this.handleShowAndHide();
              }}
            >
              {" "}
              {showPriceTable ? " Ẩn bảng giá" : "Xem chi tiết"}
            </span>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
