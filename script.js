const modal = document.querySelector('.modal-container');
const messageForm = document.getElementById('message-form');
const messageContent = document.getElementById('message-content');
const messagesList = document.getElementById('messages-list');
let messages = JSON.parse(localStorage.getItem('messages')) || [];

function openModal() {
  modal.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
}

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const content = messageContent.value;
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  messages.push({ content, author: user.name, date: new Date() });
  localStorage.setItem('messages', JSON.stringify(messages));
  loadMessages();
  closeModal();
});

function loadMessages() {
  messagesList.innerHTML = '';
  messages.forEach((msg, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${msg.content}</td>
      <td><button onclick="viewMessage(${index})">Ver</button></td>
    `;
    messagesList.appendChild(row);
  });
}

function viewMessage(index) {
  alert(`Autor: ${messages[index].author}\nData: ${new Date(messages[index].date).toLocaleString()}\nMensagem: ${messages[index].content}`);
}

loadMessages();
