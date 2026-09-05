export default function initializeWebSocket(state: Function) {
    const socket = new WebSocket("ws://localhost:8080");
    
    socket.onopen = () => {
        console.log("WebSocket connection established");

        socket.send("Hello from the client!");
    };

    socket.onmessage = (event) => {
        console.log("Message from server:", event.data);

        state(event.data);
    };

    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
        console.log("WebSocket connection closed");
    };

    return () => socket.close();
}