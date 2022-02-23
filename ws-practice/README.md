## Websocket의 원리와 ExpressJS 프레임워크에서 동작하는 Websocket 서버를 만들어보자

### 1. WebSocket ?

---

- 정의

  - HTTP와는 다른 통신 프로토콜
  - HTTP와 동일하게 OSI 참조 모델 7계층에 위치
  - TCP에 의존

- HTTP와 차이점
  - HTTP는 client와 server간 요청과 응답이 필요
  - 즉, 능동적으로 data를 client에게 전송 불가
  - 이를 반이중통신(Half-Duplex communication)이라고 한다.
  - 하지만, Websocket은 전이중통신(Full-Duplex Communication)을 지원해 Socket으로 연결된 client와 server는 각 주체가 요청과 응답 없이 능동적으로 메시지를 주고 받을 수 있다.

### 2. 실습 프로젝트 생성

---

```bash
$ npm init
$ npm i express ws
```

프로젝트 생성 및 express와 ws 라이브러리 설치

- [ExpressJS server app 설정하기 참고](https://expressjs.com/ko/starter/hello-world.html)

### 3. nodemon 설정

---

```bash
$ npm install --save-dev nodemon
```

위의 명령으로 <mark>nodemon</mark>을 설치해준다.

- package.json 파일 수정

```json
{
  "name": "ws-practice",
  "version": "1.0.0",
  "description": "web-socket-practice",
  "main": "index.js",
  "scripts": {
    "start": "node app.js",
    "start:dev": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.3",
    "ws": "^8.5.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  }
}
```

아래의 명령어로 node 서버를 실행하도록 하자

```bash
$ npm run start:dev
```
