const http = require("http");
const fs = require("fs");

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    fs.readFile("./index.html", (err, html) => {
      if (err) console.log(err);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(html);
      res.end();
    });
  }
});

server.listen(3000);
