import React from "react";
import logo from "./logo.svg";
import "./App.css";

const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
  console.log("WebSocket connection established");

  socket.send("Hello from the client!");
};

socket.onmessage = (event) => {
  console.log("Message from server:", event.data);
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

socket.onclose = () => {
  console.log("WebSocket connection closed");
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
