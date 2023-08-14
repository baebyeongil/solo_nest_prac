const socket = new WebSocket('ws://localhost:3000');
socket.onopen = function () {
  console.log('Connected');
  socket.send(
    JSON.stringify({
      event: 'events',
      data: 'test',
    }),
  );
  socket.onmessage = function (event) {
    const data = JSON.parse(event.data); // JSON 문자열을 JavaScript 객체로 변환
    console.log(data); // 실제 데이터 출력
  };
};
