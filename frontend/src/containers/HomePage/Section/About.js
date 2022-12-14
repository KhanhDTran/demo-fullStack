import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";



class About extends Component {

    render() {

        return (
            <div className="section-share section-about">
                <div className="container">
                    <div className='section-about-header'>
                        Truyền thông nói về chúng tôi
                    </div>
                    <div className='section-about-content'>
                        <div className="content-left">
                            <iframe height="300" width="500"
                                src="https://www.youtube.com/embed/FAY1K2aUg5g" title="How to get embed code 
                        from youtube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
                        encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div className="content-right">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                            consequuntur voluptates pariatur nisi dolor nesciunt temporibus optio est eius.
                            Dolorem enim fugiat nemo perferendis, excepturi numquam voluptatem odio iusto quaerat.
                        </div>
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
    connect(mapStateToProps, mapDispatchToProps)(About);
