const handleHomeSocket = (io) => {
    NShomesystem = io.of('/homesystem')

    // NShomesystem.on('connection', async (socket) => {
    //     console.log("Socket Connected");
    //     socket.on('disconnect', (socket) => {
    //         console.log("Socket Disconnected");
    //     });
    // });

}

export default handleHomeSocket;
export var NShomesystem;