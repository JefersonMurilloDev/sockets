import { Manager, Socket } from "socket.io-client"

let socket: Socket;
export const connectToServer = (token: string) => {
    
    // TODO: Conectar al servidor
    // localhost:3000/socket.io/socket.io.js
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            hola: 'hola',
            authentication: token
        }
    });
    
    socket?.removeAllListeners();
    socket = manager.socket('/');
    

    addEventListener();
}

const addEventListener = () => {

    const clientsUl = document.querySelector('#client-ul');
    const messageForm = document.querySelector<HTMLFormElement>('#message-form');
    const messageInput = document.querySelector<HTMLInputElement>('#message-input');
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul');
    const serverStatus = document.querySelector('#server-status');
    
    socket.on('connect', () => {
        serverStatus!.textContent = 'Connected';
    });
    
    socket.on('disconnect', () => {
        serverStatus!.textContent = 'Disconnected';
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(clientId => {
            clientsHtml += `<li>${clientId}</li>`;
        });
        clientsUl!.innerHTML = clientsHtml;
    });

    messageForm!.addEventListener('submit', (event) => {
        event.preventDefault();
        if (messageInput!.value.trim().length <= 0) return;
        socket.emit('message-from-client', {id: 'You', message: messageInput!.value});
        messageInput!.value = '';
    });
    
    socket.on('message-from-server', (message: {fullName: string, message: string}) => {
        const messageHtml = `<li>
            <strong>${message.fullName}</strong>
            <span>${message.message}</span>
        </li>`;
        messagesUl!.innerHTML += messageHtml;
    });
}
