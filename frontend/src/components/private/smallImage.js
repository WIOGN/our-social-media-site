import React from "react";
import './myimages.css'
import { Link } from "react-router-dom";

class SmallImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linkPath: '/image?name=' + props.src,
            imageName: '/api/getsmall/' + props.src
        }
    }

    render() {
        return (
            <Link to={this.state.linkPath}>
                <img src={this.state.imageName} className="contentThumbnail" />
            </Link>
        );
    }
}

export default SmallImage;