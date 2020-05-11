import React from "react";
import axios from "axios";
import io from "socket.io-client";

import SmallImage from './smallImage'
import './myimages.css'

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageList: null
        }
    }

    componentWillUnmount() {
    }

    componentDidMount() {
        this.getSmallImages();
    }

    getSmallImages = async () => {
        var newImageList = await axios.get('/api/private/smallimages', {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });
        console.log(newImageList.data);
        this.setState({ imageList: newImageList.data });
    }

    render() {
        if (this.state.imageList) {
            return (
                <div className="contentContainer">
                    {this.state.imageList.map((image) => <SmallImage key={image.name} src={image.name} />)}
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