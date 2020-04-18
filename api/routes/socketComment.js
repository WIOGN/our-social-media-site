import socketio from 'socket.io';

import CommentModel from '../models/commentModel';
import VotingModel from '../models/imageVoting';

const handleCommentSocket = (io) => {
    NScommentsystem = io.of('/commentsystem')

    NScommentsystem.on('connection', async (socket) => {

        socket.on('joinRoom', async (data) => {
            //room is image name
            socket.join(data.room);

            try {
                var likes = await VotingModel.countDocuments({ imageName: data.room, vote: true });
                var dislikes = await VotingModel.countDocuments({ imageName: data.room, vote: false });
                socket.emit('newVote', { likes: likes, dislikes: dislikes });
                var comments = await CommentModel.find({ imageName: data.room }).sort({ date: -1 });
                socket.emit('OldComment', comments.map((item) => ({ comment: item.comment })));
            }
            catch (err) {
                socket.emit('OldComment', [])
            }
        });

        socket.on('newComment', (data) => {
            var newComment = new CommentModel({
                imageName: data.room,
                comment: data.comment
            });
            newComment.save();

            NScommentsystem.to(data.room).emit('newComment', { comment: data.comment });
        });

        socket.on('newVote', async (data) => {

            try {
                var newVote = new VotingModel({
                    imageName: data.room,
                    vote: data.vote
                });

                await newVote.save();

                var likes = await VotingModel.countDocuments({ imageName: data.room, vote: true });
                var dislikes = await VotingModel.countDocuments({ imageName: data.room, vote: false });

                NScommentsystem.to(data.room).emit('newVote', { likes: likes, dislikes: dislikes });
            }
            catch (err) {
                console.log(err);
            }
        });

    });
}

export default handleCommentSocket;
export var NScommentsystem;