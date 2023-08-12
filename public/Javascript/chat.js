const socket = new WebSocket('ws://localhost:3000');
socket.onopen = function () {
  console.log('Connected');
  socket.send(
    JSON.stringify({
      event: 'events',
      data: 'test',
    }),
  );
  socket.onmessage = function (data) {
    console.log(data);
  };
};