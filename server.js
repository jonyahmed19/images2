const express = require("express");
const app = express();
const morgan = require("morgan");
const imagesController = require("./controller/imagesController");
app.use(morgan("dev"));
app.post("/images", imagesController);

app.listen(3000, () => {
  console.log("Server is running 3000");
});
