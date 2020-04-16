import React from "react";

import "./imagePage.css";

class CommentSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageName: props.imageName,
            text: null
        }
    }

    componentDidMount() {
        console.log(this.state.imageName);
    }

    handleTextAreaChange = async (event) => {
        this.setState({ text: event.target.value });
    }

    render() {
        return (
            <div>
                <div className="commentBar">Comment Below</div>
                <div className="newCommentBox">
                    <textarea className="newComment" placeholder="Comment here..." onChange={this.handleTextAreaChange} />
                    <button className='commentSubmitButton'>Submit</button>
                </div>
            </div>
        );
    }
}

export default CommentSection;