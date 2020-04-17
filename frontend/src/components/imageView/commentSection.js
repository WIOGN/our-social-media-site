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
            socket.emit('joinRoom', { room: this.state.imageName });
        });
        socket.on('newComment', async (data) => {
            console.log(data);
            var comments = this.state.comments;
            comments.unshift(data);

            this.setState({
                comments: comments
            })

        });
        socket.on('OldComment', async (data) => {
            console.log(data);
            this.setState({
                comments: data
            })
        });
        this.setState({ socket: socket });
    }

    handleTextAreaChange = async (event) => {
        this.setState({ text: event.target.value });
    }

    handleSubmitButton = async (event) => {
        if (this.state.socket) {
            this.state.socket.emit('newComment', { room: this.state.imageName, comment: this.state.text });
        }
    }

    render() {
        return (
            <div>
                <div className="commentBar">Comment Below</div>
                <div className="newCommentBox">
                    <textarea className="newComment" placeholder="Comment here..." onChange={this.handleTextAreaChange} />
                    <button className='commentSubmitButton' onClick={this.handleSubmitButton}>Submit</button>
                </div>
                {this.state.comments.map((comment, index) => <CommentBox key={index} comment={comment.comment} />)}
            </div>
        );
    }
}

function CommentBox(props) {
    return (
        <div className="comment">
            <div className="commentUser">Username Suppose to be Here</div>
            <div>{props.comment}</div>
        </div>
    );
}

export default CommentSection;