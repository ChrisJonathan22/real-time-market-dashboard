const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

const { marketInstruments } = require("../types/instruments.ts");
const { users } = require("../types/users.ts");

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

  // Broadcast market data to all connected clients every 5 seconds

  // Index to keep track of the current market instrument being broadcasted

let index = 0;

   setInterval(() => {

    // Generate a random number between 0 and 5 to determine whether to increase or decrease the price of the market instrument
    let randomNumber = Math.floor(Math.random() * 6);

    if (index === marketInstruments.length) {
      index = 0;
    }

    // console.log('Random number: ', randomNumber);

    server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            let currentMarketObject = {...marketInstruments[index]};

            // If the random number is 5 increase the price by 5%
            if (randomNumber === 5) {
                currentMarketObject.price += Math.floor((currentMarketObject.price/100) * 5);
            }
            // If the random number is 1 decrease the price by 5%
            if (randomNumber === 1) {
                currentMarketObject.price -= Math.floor((currentMarketObject.price/100) * 5);
            }
            client.send(`Broadcast: This is a test, index: ${index}, object: ${JSON.stringify(currentMarketObject)}`);
        }
    });
    index += 1;
  }, 5000);