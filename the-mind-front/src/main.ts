import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected");
});

socket.on("disconnect", () => {
  console.log("disconnected");
});

socket.on("chat message", (message) => {
  console.log(message);
});

const form = document.getElementById('form') as HTMLFormElement;
const input = document.getElementById('input') as HTMLInputElement;
const messages = document.getElementById('messages') as HTMLElement;
const toggleButton = document.getElementById('toggle-btn') as HTMLButtonElement;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

toggleButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (socket.connected) {
    toggleButton.innerText = 'Connect';
    socket.disconnect();
  } else {
    toggleButton.innerText = 'Disconnect';
    socket.connect();
  }
});