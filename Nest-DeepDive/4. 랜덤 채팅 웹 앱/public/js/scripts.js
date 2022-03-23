const socket = io('/chattings'); // cdn에서 가져온 socket.io.min.js의 한 메서드

const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElem = getElementById('hello_stranger');
const chattingBoxElem = getElementById('chatting_box');
const formElem = getElementById('chat_form');

// Global socket handler
socket.on('user_connected', (username) => {
  console.log(`${username}님이 연결되었습니다!`);
});

const setUserName = (username) => {
  helloStrangerElem.innerHTML = `반가운 소환사 ${username} 님!`;
};

function helloUser() {
  const username = prompt('이름을 입력해주세요!');
  // .emit("이벤트 이름", 보낼 데이터)
  socket.emit('new_user', username, (data) => {
    console.log(data);
    setUserName(data);
  }); // client -> server
}

function init() {
  helloUser();
}

init();
