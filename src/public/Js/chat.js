const socket = new WebSocket();
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
