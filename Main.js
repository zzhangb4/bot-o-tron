const LishogiApi = require("./LishogiApi");

const RobotUser = require("./RobotUser");
const PatzerPlayer = require("./bots/PatzerPlayer");
const AntiPatzerPlayer = require("./bots/AntiPatzerPlayer");

async function startBot(token, player) {
  if (token) {
    const robot = new RobotUser(new LishogiApi(token), player);
    const username = (await robot.start()).data.username;
    return `<a href="https://lishogi.org/@/${username}">${username}</a> on lishogi.</h1><br/>`;
  }
}

async function begin() {
  var links = "<h1>Challenge:</h1><br/>";

  links += await startBot(process.env.API_TOKEN, new PatzerPlayer());
  // heroku wakeup server (not necessary otherwise)

  const express = require("express");
  const PORT = process.env.PORT || 5000;

  express()
    .get("/", (req, res) => res.send(links))
    .listen(PORT, () => console.log(`Wake up server listening on ${PORT}`));
}

begin();
