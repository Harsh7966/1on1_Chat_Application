const { Server } = require("socket.io");

const userSocketMap = {};
let io;

const initializeSocketIO = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("a user connected", socket.id);

        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocketMap[userId] = socket.id;
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }

        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id);
            if (userId && userSocketMap[userId] === socket.id) {
                delete userSocketMap[userId];
                io.emit("getOnlineUsers", Object.keys(userSocketMap));
            }
        });
    });
};

const getUserSocket = (userId) => {
    console.log("userSocketMap", userSocketMap);
    return userSocketMap[userId];
};

const getSocketIO = () => {
    return io; // Return the io instance
};

module.exports = {
    initializeSocketIO,
    getUserSocket,
    getSocketIO, // Export the function to get io
    userSocketMap
};
