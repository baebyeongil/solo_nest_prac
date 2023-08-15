const socket = new WebSocket('ws://localhost:3000');

const nickname = prompt('Please enter your nickname:');

socket.onopen = function () {
  console.log('Connected');
  socket.send(
    JSON.stringify({
      event: 'mainRoom',
      data: nickname,
    }),
  );
  socket.onmessage = function (event) {
    const data = JSON.parse(event.data); // JSON 문자열을 JavaScript 객체로 변환
    console.log(`${data} 님께서 입장하셨습니다.`); // 실제 데이터 출력
  };
};
