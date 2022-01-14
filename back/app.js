const express = require("express");
const morgan = require("morgan");

const PORT = 4000;
const app = express();

app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`${PORT} API SERVER START!`);
});
