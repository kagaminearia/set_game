const express = require("express");

const leaderboardRouter = express.Router();

const dbo = require("../db/conn");

leaderboardRouter.get("/", (req, res) => {
  const dbConnect = dbo.getDb();
  console.log(dbo);

  dbConnect
    .collection("gameEntries")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching game entries");
      } else {
        res.json(result);
      }
    });
});

// This section will help you create a new document.
leaderboardRouter.post("/", (req, res) => {
  console.log(req);
  const dbConnect = dbo.getDb();
  const gameEntry = {
    score: req.body.score,
    time: req.body.time,
    name: req.body.name,
  };

  dbConnect
    .collection("gameEntries")
    .insertOne(gameEntry, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting game entry!");
      } else {
        console.log(`Added a new game with id ${result.insertedId}`);
        res.json("ashley");
      }
    });
});

module.exports = leaderboardRouter;
