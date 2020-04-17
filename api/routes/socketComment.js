import socketio from 'socket.io';

import CommentModel from '../models/commentModel';

const handleServerSocket = (server) => {
    var io = socketio(server);

    io.on('connection', async (socket) => {

        socket.on('joinRoom', async (data) => {
            //room is image name
            socket.join(data.room);

            try {
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

            io.to(data.room).emit('newComment', { comment: data.comment });
        });

    });
}

export default handleServerSocket;