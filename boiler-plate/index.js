const express = require("express");
const app = express();
const port = 3000;

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

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`listening on port ${port}!`));
