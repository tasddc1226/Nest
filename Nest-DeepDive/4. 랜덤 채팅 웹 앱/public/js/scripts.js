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
  drawNewChat(`${username} : ${chat}`);
});

socket.on('disconnect_user', (username) =>
  drawNewChat(`${username}님이 떠났습니다..`),
);

// ========= Draw functions =========
const drawUserName = (username) => {
  helloStrangerElem.innerHTML = `소환사 ${username} 님! 어서오세요.`;
};

const drawNewChat = (message, isMe = false) => {
  const wrapperChatBox = document.createElement('div');
  wrapperChatBox.className = 'clearfix';
  let chatBox;
  if (!isMe) {
    chatBox = `
        <div class='bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix break-all'>${message}</div>
    `;
  } else {
    chatBox = `
        <div class='bg-white w-1/2 ml-auto mr-4 my-2 p-2 rounded-lg clearfix break-all text-right'>${message}</div>
    `;
  }
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
    drawNewChat(`Me : ${inputValue}`, true);
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
