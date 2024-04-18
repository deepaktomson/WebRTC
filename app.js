const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 3000

const app  = express();

const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + `/public/index.html`);
})

let connectedUsers = [];

io.on("connection", (socket) => {
    console.log(`user connected. Socket id - ${socket.id}`)
    connectedUsers.push(socket.id)

    socket.on("disconnect", () => {
        console.log(`user disconnected ${socket.id}`);

        const newConnectedUsers = connectedUsers.filter((peer) => {
            return peer !== socket.id;
        })
        connectedUsers = newConnectedUsers;
    })
})

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
});