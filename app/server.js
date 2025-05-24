const express = require("express");
const requestLogger = require("./influxDB/requestLogger");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));

app.use(express.static(path.join(__dirname, "./src/views")));

app.use(requestLogger);

const PORT = process.env.PORT || "3000";
const NAME = process.env.NAME || "server-name";

app.get("/", (req, res) => {
  res.render("welcome");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
