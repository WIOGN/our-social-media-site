import React from "react";
import axios from "axios";
import io from "socket.io-client";

import SmallImage from './smallImage'
import './home.css'

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            imageList: null
        }
    }

    componentWillUnmount() {
        if (this.state.socket) {
            this.state.socket.disconnect();
        }
    }

    componentDidMount() {
        this.getSmallImages();
        this.handleSocket();
    }

    handleSocket = async () => {
        var socket = io('/homesystem');

        this.setState({
            socket: socket
        });

        socket.on('newUpload', async (data) => {
            var imageList = this.state.imageList;

            imageList.unshift({ name: data.imageName });

            this.setState({
                imageList: imageList
            });

        });
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