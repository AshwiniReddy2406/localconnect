// index.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Server is working!");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
