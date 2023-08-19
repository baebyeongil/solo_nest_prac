const socket = new WebSocket('ws://localhost:3000');

const nickname = prompt('Please enter your nickname:');

socket.onopen = function () {
  axios.get('/api/user').then(function (response) {
    console.log(response);
  });
  socket.send(
    JSON.stringify({
      event: 'mainRoom',
      data: nickname,
    }),
  );
  socket.onmessage = function (event) {
    const data = JSON.parse(event.data); // JSON 문자열을 JavaScript 객체로 변환
    if (data.event === 'mainRoom') {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');
      messageDiv.innerHTML = `
        <div class="messagAlarm">▶▶▶ ${data.data} 님이 접속하셨습니다 ◀◀◀</div>`;

      const chatMessages = document.querySelector('.chatMessages');
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    if (data.event === 'mainChat') {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');
      messageDiv.innerHTML = `
        <div class="messag">${data.data.nickname}님 : ${data.data.messageText}</div>`;

      const chatMessages = document.querySelector('.chatMessages');
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  };

  sendMessage = () => {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value;
    if (messageText.trim() === '') return;

    socket.send(
      JSON.stringify({
        event: 'mainChat',
        data: { nickname, messageText },
      }),
    );

    messageInput.value = '';
  };
};
