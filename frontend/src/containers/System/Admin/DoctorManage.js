import * as actions from "../../../store/actions"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorManage.scss'
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class DoctorManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: ''
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, preState, snapshot) {

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }

    handleSaveDoctorContent = () => {
        console.log(this.state)
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption }, () => { }
        );
    };

    handleOnChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    render() {
        let options = [{ value: "1", label: "1" }, { value: "2", label: "2" }]
        return (
            <div className="doctor-manage-container">
                <div className="doctor-manage-title">
                    Tạo thêm thông tin bác sĩ
                </div>
                <div className="more-infor">
                    <div className="content-left">
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={options}
                        />
                    </div>
                    <div className="content-right">
                        <label>Thông tin giới thiệu</label>
                        <textarea onChange={(e) => { this.handleOnChangeDescription(e) }} className="form-control" rows='4'></textarea>
                    </div>
                </div>
                <div className="manage-doctor-editor">

                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
                </div>
                <button onClick={() => { this.handleSaveDoctorContent() }}
                    className="save-doctor-content btn btn-primary">
                    Lưu thông tin
                </button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
