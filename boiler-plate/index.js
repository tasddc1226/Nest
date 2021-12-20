const express = require("express");
const bodyParser = require("body-parser");

const { User } = require("./models/User");

const app = express();
const port = 3000;

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://tasddc:dan9797@bolierplate.xxf1w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,   몽구스 버전이 6.0 이상이면 error 발생
      //useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected.."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello 앙 귀모링! !!!!"));

app.post("/signin", (req, res) => {
  // 정보 추출 후 DB에 넣어주기
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`listening on port ${port}!`));
