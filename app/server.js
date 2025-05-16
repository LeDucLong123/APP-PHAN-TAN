const express = require("express");
const requestLogger = require("./influxDB/requestLogger");

const app = express();
app.use(requestLogger);

const PORT = process.env.PORT || "3000";
const NAME = process.env.NAME || "server-name";
// app.get("/", (req, res) => {
//   console.log("/-----");
//   res.send("Hello World! 123");
// });

// app.get("/test", (req, res) => {
//   console.log("/test");
//   setTimeout(() => res.send("Delayed"), 500);
// });

app.get("/", (req, res) => {
  res.send(
    `${NAME} is running on port ${PORT} - Write on http://${process.env.INFLUXDB}:${process.env.INFLUXDB_PORT}`
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
