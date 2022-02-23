const express = require("express");
const { WebSocketServer } = require("ws");
const app = express();
const port = 8000;
const ws_port = 8001;

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

// create web-socket-server
const wss = new WebSocketServer({ port: ws_port }); // wss : 웹소켓 서버

// broadcast
wss.broadcast = (message) => {
  wss.clients.forEach((client) => {
    client.send(message);
  });
};

// web-socket-server run
// ws : 연결된 클라이언트
wss.on("connection", (ws, req) => {
  // 데이터 수신 이벤트
  ws.on("message", (data) => {
    console.log(`Received from user: ${data}`);
    wss.broadcast(data.toString());
    // ws.send(`Received ${data}`); // server -> client
  });

  ws.on("close", () => {
    wss.broadcast(`유저가 떠났습니다. [총 ${wss.clients.size} 명]`);
  });

  wss.clients.forEach((client) => {
    wss.broadcast(
      `새로운 유저가 접속했습니다. 환영해주세요! [총 ${wss.clients.size} 명]`,
    );
  });

  // server logging
  console.log(`새로운 유저 접속: ${req.socket.remoteAddress}`);

  // 연결 직후 client에게 message send example
  //   ws.send(`Hello, ${req.socket.remoteAddress}`);
});
