const socket = io('/chattings'); // cdn에서 가져온 socket.io.min.js의 한 메서드

const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElem = getElementById('hello_stranger');
const chattingBoxElem = getElementById('chatting_box');
const formElem = getElementById('chat_form');

// ========= Global socket handler =========
socket.on('user_connected', (username) => {
  drawNewChat(`만나서 반가워요 소환사 ${username}님!`);
});

socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawNewChat(`${username}: ${chat}`);
});

// ========= Draw functions =========
const drawUserName = (username) => {
  helloStrangerElem.innerHTML = `반가운 소환사 ${username} 님!`;
};

const drawNewChat = (message) => {
  const wrapperChatBox = document.createElement('div');
  const chatBox = `
    <div>${message}</div>
  `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElem.append(wrapperChatBox);
};

// =========  Event callback functions =========
const handleSubmit = (event) => {
  // 새로고침 방지
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    drawNewChat(`Me : ${inputValue}`);
    formElem.reset();
  }
};

function helloUser() {
  const username = prompt('소환사 이름을 입력해주세요!');
  // .emit("이벤트 이름", 보낼 데이터)
  socket.emit('new_user', username, (data) => {
    console.log(data);
    drawUserName(data);
  }); // client -> server
}

function init() {
  helloUser();
  // 메시지 전송 이벤트 연결
  formElem.addEventListener('submit', handleSubmit);
}

init();
