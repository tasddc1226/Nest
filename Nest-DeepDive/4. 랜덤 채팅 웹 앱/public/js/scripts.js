const socket = io('/chattings'); // cdn에서 가져온 socket.io.min.js의 한 메서드

const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElem = getElementById('hello_stranger');
const chattingBoxElem = getElementById('chatting_box');
const formElem = getElementById('chat_form');

function helloUser() {
  const username = prompt('이름을 입력해주세요!');
  // .emit("이벤트 이름", 보낼 데이터)
  socket.emit('new_user', username); // client -> server

  // 콜백으로 server로부터 hello_user라는 이벤트 수신
  socket.on('hello_user', (data) => {
    console.log('data: ' + data);
  });
}

function init() {
  helloUser();
}

init();
