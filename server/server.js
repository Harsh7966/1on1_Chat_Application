// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const ConnectDB = require("./db_Connection/db_Connection");
const { initializeSocketIO } = require("./socket/socket");
require("dotenv").config();

const PORT = process.env.PORT || 1010;
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static("./uploads"));

// Routes
app.use("/api/auth/user", require("./routes/authRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

// Start server and initialize Socket.io
const serverStart = async () => {
    await ConnectDB();
    server.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`);
    });

    initializeSocketIO(server); // Passing the server to initializeSocketIO
};

serverStart();

module.exports = { app, server };