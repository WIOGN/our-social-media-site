import React from "react";
import io from "socket.io-client";

import "./imagePage.css";

class CommentSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageName: props.imageName,
            likes: null,
            dislikes: null,
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
        this.handleSocket()
    }

    handleSocket = async () => {
        var socket = io('/commentsystem');
        socket.on('connect', async (data) => {
            socket.emit('joinRoom', { room: this.state.imageName });
        });
        socket.on('newComment', async (data) => {
            var comments = this.state.comments;
            comments.unshift(data);

            this.setState({
                comments: comments
            })

        });
        socket.on('OldComment', async (data) => {
            this.setState({
                comments: data
            })
        });

        socket.on('newVote', async (data) => {
            this.setState({
                likes: data.likes,
                dislikes: data.dislikes
            })
        });
        this.setState({ socket: socket });
    }

    handleTextAreaChange = async (event) => {
        this.setState({ text: event.target.value });
    }

    handleSubmitButton = async () => {
        if (this.state.socket) {
            this.state.socket.emit('newComment', { room: this.state.imageName, comment: this.state.text });
        }
    }

    handleLike = async () => {
        if (this.state.socket) {
            this.state.socket.emit('newVote', { room: this.state.imageName, vote: true });
        }
    }

    handleDislike = async () => {
        if (this.state.socket) {
            this.state.socket.emit('newVote', { room: this.state.imageName, vote: false });
        }
    }

    render() {
        return (
            <div>
                <button className="ratingButton" onClick={this.handleLike}>Like</button>
                <div className='ratingCounter'>{this.state.likes}</div>
                <button className="ratingButton" onClick={this.handleDislike}>Dislike</button>
                <div className='ratingCounter'>{this.state.dislikes}</div>
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