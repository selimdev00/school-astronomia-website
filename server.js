const express = require("express");
const app = express();

const fs = require("fs");

app.use(express.static(`${__dirname}/assets`));
app.use(express.static(`${__dirname}/node_modules`));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", (err, html) => {
    if (err) console.log(err);

    fs.readFile("./data/planets-list.json", (err, planets) => {
      if (err) console.log(err);

      planets = JSON.parse(planets);
      res.render("index", planets);
    });
  });
});

app.get("/planets/:name", (req, res) => {
  const planetName = req.params.name;
  const planetModelName = planetName.toLowerCase();
  fs.readFile(`./data/contents/${planetModelName}.json`, (err, data) => {
    if (err) console.log(err);

    const planetContent = JSON.parse(data).content;

    res.render("planet", { planetName, planetModelName, planetContent });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${3000}`));
