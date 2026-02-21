const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

// When a user connects
io.on("connection", (socket) => {
    console.log("A user connected");


    // Receive message from client (expects { username, message })
    socket.on("chat message", (data) => {
        // Broadcast user's message
        io.emit("chat message", {
            username: data.username,
            message: data.message
        });

        // Bot response after a short delay
        setTimeout(() => {
            io.emit("chat message", {
                username: "ChatBot",
                message: `Hello, ${data.username}! You said: "${data.message}"`
            });
        }, 1000);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

http.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
