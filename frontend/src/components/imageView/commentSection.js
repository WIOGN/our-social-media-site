import React from "react";
import io from "socket.io-client";
import axios from 'axios';

import "./imagePage.css";

class CommentSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageName: props.imageName,
            username: null,
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
        this.getImageData();
        this.handleSocket();
    }

    getImageData = async () => {
        try {
            var res = await axios.get('/api/imagedata/' + this.state.imageName);
            var data = res.data;
            this.setState({
                username: data.username.username,
                likes: data.likes,
                dislikes: data.dislikes,
                comments: data.comments
            })
        }
        catch (err) {
            console.log(err);
        }
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
        socket.on('newVote', async (data) => {
            this.setState({
                likes: data.likes,
                dislikes: data.dislikes
            })
        });
        this.setState({ socket: socket });
    }

    handleTextAreaChange = async (event) => {
        event.preventDefault();
        this.setState({ text: event.target.value });
    }

    handleSubmitButton = async () => {
        try {
            var res = await axios.post('/api/imagedata/newcomment', {
                auth_token: localStorage.getItem('token'),
                imageName: this.state.imageName,
                comment: this.state.text
            });
            // console.log(res.status)
            if (res.status === 200) {
                this.setState({
                    text: null
                });
                document.getElementById("commentTextArea").value = '';
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    handleLike = async () => {

        if (localStorage.getItem('token')) {
            try {
                var res = await axios.post('/api/imagedata/vote', {
                    auth_token: localStorage.getItem('token'),
                    imageName: this.state.imageName,
                    vote: true
                })

                if (res.status === 200) {
                    // console.log(res.data);
                    this.setState({
                        likes: res.data.likes,
                        dislikes: res.data.dislikes
                    });
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    handleDislike = async () => {
        if (localStorage.getItem('token')) {
            try {
                var res = await axios.post('/api/imagedata/vote', {
                    auth_token: localStorage.getItem('token'),
                    imageName: this.state.imageName,
                    vote: false
                })

                if (res.status === 200) {
                    // console.log(res.data);
                    this.setState({
                        likes: res.data.likes,
                        dislikes: res.data.dislikes
                    });
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    render() {
        return (
            <div>
                <button className="ratingButton" onClick={this.handleLike}>Like</button>
                <div className='ratingCounter'>{this.state.likes}</div>
                <button className="ratingButton" onClick={this.handleDislike}>Dislike</button>
                <div className='ratingCounter'>{this.state.dislikes}</div>
                <p>Image posted by: {this.state.username}</p>
                <div className="commentBar">Comment Below</div>
                <div className="newCommentBox">
                    <textarea id="commentTextArea" value={this.state.value} className="newComment" placeholder="Comment here..." onChange={this.handleTextAreaChange} />
                    <button className='commentSubmitButton' onClick={this.handleSubmitButton}>Submit</button>
                </div>
                {this.state.comments.map((comment) => <CommentBox key={comment._id} comment={comment} />)}
            </div>
        );
    }
}

function CommentBox(props) {
    return (
        <div className="comment">
            <div className="commentUser">{props.comment.username}</div>
            <div>{props.comment.comment}</div>
        </div>
    );
}

export default CommentSection;