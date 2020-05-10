const handleHomeSocket = (io) => {
    NShomesystem = io.of('/homesystem');
}

export default handleHomeSocket;
export var NShomesystem;