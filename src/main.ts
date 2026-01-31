import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Client</h2>
    <input placeholder="JWT Token" id="jwt-token" type="text">
    <button id="jwt-token-btn">Connect</button>

    <br/>
    <span id="server-status">offline</span>
    <ul id="client-ul">
        <li></li>
    </ul>
    <form id="message-form">
        <input placeholder="Send message" id="message-input" type="text">
        <button>Send</button>
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`
//connectToServer();
const inputToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#jwt-token-btn')!;

btnConnect.addEventListener('click', () => {
    if (inputToken.value.trim().length <= 0) return alert('Token is required');
    connectToServer(inputToken.value.trim());
});