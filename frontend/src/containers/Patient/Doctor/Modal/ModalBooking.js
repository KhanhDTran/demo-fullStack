import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalBooking.scss";

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

  render() {
    return <div className="modal-booking-container"></div>;
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
