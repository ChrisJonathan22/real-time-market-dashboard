import React, { useState, useEffect } from "react";
import "./App.css";
import socket from "./services/websockets";
import { MarketInstrument } from "./services/websockets";

function App() {
  let [message, setMessage] = useState<MarketInstrument | null>(null);

  useEffect(() => {
    return socket(setMessage);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Real-Time Market Dashboard</h1>
        <div className="table_container">
          <div className="table_header">
            <div className="table_row">Symbol</div>
            <div className="table_row">Company</div>
            <div className="table_row">Price</div>
            <div className="table_row">Change</div>
          </div>
          {message ? (
            <div className="table_content">
              <div>{message?.symbol}</div>
              <div>{message?.name}</div>
              <div>{message?.price}</div>
              <div>{message?.changeType}</div>
            </div>
          ) : (
            <div className="table_content">
              <div>Company Symbol</div>
              <div>Company Name</div>
              <div>Company Price</div>
              <div>Company Price Change Status</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
