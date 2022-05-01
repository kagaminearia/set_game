const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const _ = require("lodash");
const dbo = require("./db/conn");
const gameRouter = require("./routes/game.js");
const leaderboardRouter = require("./routes/Leaderboard.js");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// user session middleware
app.use(cookieParser());
app.use(session({ secret: "test" }));

// server react front-end
app.use(express.static(path.join(__dirname, "../client/build")));

app.use("/Game", gameRouter);
app.use("/Leaderboard", leaderboardRouter);

const port = 3000;

dbo.connectToServer((err) => {
  if (err) {
    console.error(err);
    process.exit();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
