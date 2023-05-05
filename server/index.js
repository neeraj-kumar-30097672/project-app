const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  console.log("Message", req.query.msg);
  console.log("Latitude", req.query.lat);
  console.log("Longitude", req.query.long);
  res.send({ isRelated: true, id: "123456" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
