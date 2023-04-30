const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

var db, collection;
const dbName = "personal";
const url =
"mongodb+srv://koshinmongo:myMongo@cluster0.ozyrwol.mongodb.net/personal?retryWrites=true&w=majority";

app.listen(5500, () => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db();
      console.log("Connected to `" + dbName + "`!");
    }
  );
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  db.collection("playerInfo")
    .find()
    .toArray((err, allDocuments) => {
      if (err) return console.log(err);
      res.render("index.ejs", { nbaStats : allDocuments });
    });
});

app.post("/saveNbaStats", (req, res) => {
  db.collection("playerInfo").insertOne(
    { playerName: req.body.name, playerPosition: req.body.position, playerTeam: req.body.team, pointsPerGame: req.body.pointsPerGame},
    (err, result) => {
      if (err) return console.log(err);
      console.log("saved to database");
      res.redirect("/");
    }
  );
});
app.delete("/delete", (req, res) => {
  db.collection("playerInfo").findOneAndDelete(
    { playerName: req.body.deleteName, playerPosition: req.body.deleteplayerPosition, playerTeam: req.body.deleteplayerTeam, pointsPerGame: req.body.deletepointsPerGame },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Message deleted!");
    }
  );
});


