const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

// Array to keep track of assigned user IDs
const users = [{ id: 1, assigned: false }, { id: 2, assigned: false }, { id: 3, assigned: false }, { id: 4, assigned: false }, { id: 5, assigned: false }, { id: 6, assigned: false }, { id: 7, assigned: false }, { id: 8, assigned: false }, { id: 9, assigned: false }, { id: 10, assigned: false }];

// Handle WebSocket connections
server.on("connection", (socket) => {
  console.log("WebSocket connection established");

  // a new user connects, assign them an availabe user ID
  for (const user of users) {
    if (!user.assigned) {
        socket.userId = user.id;
        user.assigned = true;
        break;
    }
  }

  console.log("Assigned userID:", socket.userId);

  // Handle incoming messages from clients
  socket.on("message", (data) => {
    const message = data.toString();
    console.log(`Message from client with the ID: ${socket.userId} - `, message);

    server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(`Broadcast: ${message}`);
        }
    });
  });

  socket.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  // Handle WebSocket connection closure
  socket.on("close", () => {
    console.log("WebSocket connection closed");

    // Release the user ID when the connection is closed
    for (const user of users) {
        if (user.id === socket.userId) {
            user.assigned = false;
            console.log("User ID released: ", user.id);
            break;
        }
    }
  });
});
