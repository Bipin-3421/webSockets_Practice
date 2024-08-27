import express, { Request, Response } from "express";
import { Server } from "socket.io";
import { config } from "dotenv";
import http from "http";
import cors from "cors";
config();

const app = express();

const server = http.createServer(app);

//creating the io circuit instance
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive-message", data);
    // io.emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });

  // //in socket.emit the message goes to the corresponding circuit

  // socket.emit("welcome", `welcome to the server`);
  // //but in different in broadcast
  // socket.broadcast.emit("welcome", `${socket.id} joined the server`);
});

const port = process.env.PORT;

app.use(cors());

server.listen(port, () => {
  console.log(`The server is working on port:${port}`);
});
