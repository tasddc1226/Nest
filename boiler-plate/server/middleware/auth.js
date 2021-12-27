const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리
  // 클라이언트 쿠키에서 토큰을 가져옴
  let token = req.cookies.x_auth;
  console.log(token);
  // 토큰 복호화 후 유저 찾기
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    // user가 없는 경우 client에게 err 전송
    if (!user) return res.json({ isAuth: false, error: true });
    // req에 넣어줌으로 다른 곳에서 사용 가능하도록
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
