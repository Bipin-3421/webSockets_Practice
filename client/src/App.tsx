import { Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";

const App = () => {
  const socket = useMemo(() => io("http://localhost:4001"), []);

  const [message, setMessage] = useState("");

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
    });

    socket.on("welcome", (s: string) => {
      console.log(s);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container>
      <Typography>welcome to socket.io</Typography>
      <form onSubmit={submitHandler}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" color="primary">
          send
        </Button>
      </form>
    </Container>
  );
};

export default App;
