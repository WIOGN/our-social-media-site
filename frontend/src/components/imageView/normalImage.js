import React from "react";
import queryString from "query-string";
import axios from "axios";

import CommentSection from './commentSection';
import './imagePage.css';

class NormalImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageName: queryString.parse(this.props.location.search).name
        }
    }

    componentDidMount() {
        console.log(this.state.imageName);
    }

    render() {
        return (
            <div>
                <img src={'/api/getimage/' + this.state.imageName} className='imageDisplay' />
                <CommentSection imageName={this.state.imageName} />
            </div>
        );
    }
}

export default NormalImage;