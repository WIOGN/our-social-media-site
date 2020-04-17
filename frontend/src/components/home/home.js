import React from "react";
import axios from "axios";

import SmallImage from './smallImage'
import './home.css'

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageList: null
        }
    }

    componentDidMount() {
        this.getSmallImages();
    }

    getSmallImages = async () => {
        var newImageList = await axios.get('/api/getsmall');
        console.log(newImageList.data);
        this.setState({ imageList: newImageList.data });
    }

    render() {
        if (this.state.imageList) {
            return (
                <div className="contentContainer">
                    {this.state.imageList.map((image, i) => <SmallImage key={i} src={image.name} />)}
                </div>
            );
        }
        else {
            return (
                <div>Loading...</div>
            );
        }
    }
}

export default Homepage;