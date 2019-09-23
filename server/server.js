const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

var connections = [];

io.serveClient("origins", "*");

io.on("connection", async (socket) => {
    let socketId = socket.id
    connections.push(socketId);
    console.log("clients connected: " + connections);

    socket.on("disconnect", () => {
        connections.splice(connections.indexOf(socketId), 1);
        console.log("clients connected: " + connections);
    });

    socket.on("chatSend", data => {
        console.log(`${data.group} -- ${data.user}: ${data.message}`);
        io.emit("chatRecieve", `${data.user}: ${data.message}`);
    });
});

server.listen(5000);