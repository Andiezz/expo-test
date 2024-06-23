// socket.ts
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8081/'; // replace with your server URL

const socket: Socket = io(SOCKET_URL, {
  transports: ['websocket'], // specify the transport method
});

export default socket;
