const socket = io('/'); // cdn에서 가져온 socket.io.min.js의 한 메서드

const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElem = getElementById('hello_stranger');
const chattingBoxElem = getElementById('chatting_box');
const formElem = getElementById('chat_form');

function helloUser() {
  const username = prompt('이름을 입력해주세요!');
}

function init() {
  helloUser();
}

init();
