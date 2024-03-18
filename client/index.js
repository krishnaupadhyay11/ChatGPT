// import { newCounter, onlyCounter, setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button">Count is <span id="count">0</span></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `;
// onlyCounter(document.querySelector('#counter'))

import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat-container');

let loadInterval;

function loader(element){
  element.textContent = 'jk';
  console.log('loader');

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === '....'){
      element.textContent = '';
    }
  }, 300)
}

function typeText(element, text){
  let index = 0;

  let interval = setInterval(() => {
    if (index<text.length){
      element.innerHTML = text.charAt(index);
      index++;
    }
    else{
      clearInterval(interval);
    }
  }, 20)
}

function generateUniqueId(){
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`
}

function chatStripe(isAi, value, uniqueId){
  return (
    `
      <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
          <div class="profile">
            <img src="${isAi ? bot : user}" alt="${isAi ? 'bot' : 'user'}" />
          </div>
          <div class="message" id="${uniqueId}">
            ${value}
          </div>
        </div>
      </div>
    `
  )
}

async function handleSubmit(e){
  e.preventDefault();
  const data = new FormData(form);

  //user's chatStripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
  form.reset();

  //bot's chatStripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, ' ', uniqueId);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);

  // fetch data from server -> bot's response

  const response = await fetch('http://localhost:8000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  })

  clearInterval(loadInterval);
  

  if(response.ok){
    const { bot } = await response.json();
    clearInterval(loadInterval);
    messageDiv.textContent = bot;
  }
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.key === 'Enter'){
    handleSubmit(e);
  }
})