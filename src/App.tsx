import React, { useState, useEffect } from "react";
import socket from "./services/websockets";

function App() {
  let [message, setMessage] = useState("");

  useEffect(() => {
    return socket(setMessage);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Real-Time Market Dashboard</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
