export type MarketInstrument = {
    symbol: string;
    name: string;
    price: number;
    changeType: string;
}

export default function initializeWebSocket(state: (instrument: MarketInstrument) => void) {
    const socket = new WebSocket("ws://localhost:8080");
    
    socket.onopen = () => {
        console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
        console.log("Raw message from server:", event.data);
        state(JSON.parse(event.data));
    };

    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
        console.log("WebSocket connection closed");
    };

    return () => socket.close();
}
