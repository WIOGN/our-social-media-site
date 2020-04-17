import React from "react";
import io from "socket.io-client";

import "./imagePage.css";

class CommentSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageName: props.imageName,
            text: null,
            socket: null,
            comments: []
        }
    }

    componentWillUnmount() {
        if (this.state.socket) {
            this.state.socket.disconnect();
        }
    }

    componentDidMount() {
        console.log(this.state.imageName);
        this.handleSocket()
    }

    handleSocket = async () => {
        var socket = io('/');
        socket.on('connect', async (data) => {
            console.log('Socket Connected!!!');
        });
        socket.on('newComment', async (data) => {
            console.log('New Comment');
            console.log(data);
        });
        socket.on('allComment', async (data) => {
            console.log('Old Comment');
        });
        this.setState({ socket: socket });
    }

    handleTextAreaChange = async (event) => {
        this.setState({ text: event.target.value });
    }

    handleSubmitButton = async (event) => {

    }

    render() {
        return (
            <div>
                <div className="commentBar">Comment Below</div>
                <div className="newCommentBox">
                    <textarea className="newComment" placeholder="Comment here..." onChange={this.handleTextAreaChange} />
                    <button className='commentSubmitButton'>Submit</button>
                </div>
                <CommentBox />
            </div>
        );
    }
}

function CommentBox(props) {
    return (
        <div className="comment">
            <div className="commentUser">Username Here</div>
            <div>Hey</div>
        </div>
    );
}

export default CommentSection;