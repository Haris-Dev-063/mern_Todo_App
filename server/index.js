const express = require("express");
const app = express();
const auth = require("./authFunc/user_Auth");
const list_Auth = require("./authFunc/list_Auth");
require("./connection/conn");
app.use(express.json());

app.use("/api/v1/", auth);
app.use("/api/v2/", list_Auth);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
