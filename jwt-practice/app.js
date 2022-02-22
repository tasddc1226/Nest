const crypto = require("crypto");

// json 객체를 base64로 인코딩해주는 함수
function base64(json) {
  const stringified = JSON.stringify(json);

  const base64Encoded = Buffer.from(stringified).toString("base64");

  const paddingRemoved = base64Encoded.replaceAll("=", "");

  return paddingRemoved;
}

const header = {
  alg: "HS256",
  typ: "JWT",
};

// header 인코딩
const encodedHeader = base64(header);

const payload = {
  email: "admin@naver.com",
  name: "admin",
  isAdmin: true,
};

// payload 인코딩
const encodedPayload = base64(payload);

// 인코딩된 header와 payload를 가지고 signature 생성
const signature = crypto
  .createHmac("sha256", "secret_key")
  .update(`${encodedHeader}.${encodedPayload}`)
  .digest("base64")
  .replaceAll("=", "");

// signature까지 합쳐서 jwt token을 조합
const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;

console.log(jwt);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG5hdmVyLmNvbSIsIm5hbWUiOiJhZG1pbiIsImlzQWRtaW4iOnRydWV9.F041SGjv+RTe0RedohocKKabnT4w+lbXNF1/GU2iCuw

// 생성된 token을 검증하는 방법
// 1. https://jwt.io/ 접속
// 2. signature를 만들때 사용한 "secret_key"를 사이트의 VERIFY SIGNATURE 빈칸 부분에 입력, base64로 encoding 했기 때문에 체크박스 check
// 3. 위에서 생성된 jwt를 좌측에 붙여넣기
// 4. 아래쪽에 Signature Verified가 출력되어지면 성공
// 5. 또한 HEADER와 PAYLOAD에 위에서 json 형태로 만들었던 것과 동일한지 확인 가능!
