const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const { User } = require("../models/User");


router.post("/signup", (req, res) => {
    // 정보 추출 후 DB에 넣어주기
    const user = new User(req.body);
  
    user.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    });
  });
  
router.post("/signin", (req, res) => {
    // 이메일을 DB에서 찾음
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "유저를 찾을 수 없습니다.",
            });
        }

        // 이메일이 DB에 있다면 비밀번호 일치여부 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
            return res.json({
                loginSuccess: false,
                message: "비밀번호가 틀렸습니다.",
            });
        }
        // 토큰 생성
        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            // token 저장? [cookie] or local Storage or Session ..
            res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
        });
    });
});

// role 1 : admin, role 2 : 특정 부서 admin
// role 0 : normal user, role != 0 : 관리자
router.get("/auth", auth, (req, res) => {
    // middleware를 통과한 경우 : Auth가 True
    res.status(200).json({
        // middleware에서 req에 user와 token을 넣었기 때문에 사용 가능
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
        success: true,
        });
    });
});

module.exports = router;