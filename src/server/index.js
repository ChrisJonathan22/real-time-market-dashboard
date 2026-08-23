const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

// randomly increase or decrease the price of market instruments every 5 seconds
// send it through WebSocket
// React client receives it
// parse the message
// update React state
// dashboard/table updates automatically


const marketInstruments = [
  {
    symbol: "AAPL",
    name: "Apple",
    price: 228.50
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    price: 505.25
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    price: 181.75
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    price: 342.10
  },
  {
    symbol: "AMZN",
    name: "Amazon",
    price: 231.40
  }
];


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

  // Broadcast market data to all connected clients every 5 seconds

  // Index to keep track of the current market instrument being broadcasted
let index = 0;

   setInterval(() => {

    // Generate a random number between 0 and 5 to determine whether to increase or decrease the price of the market instrument
    let randomNumber = Math.floor(Math.random() * 6);

    if (index === marketInstruments.length) {
        index = 0;
    }

    console.log('Random number: ', randomNumber);

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
