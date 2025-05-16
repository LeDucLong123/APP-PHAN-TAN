const express = require("express");
const requestLogger = require("./influxDB/requestLogger");

const app = express();
app.use(requestLogger);

const PORT = process.env.PORT || "3000";
const NAME = process.env.NAME || "server-name";

app.get("/", (req, res) => {
  res.send(
    `
      <title>App Server</title>
      <h1>Chào Bạn!</h1>
      ${NAME} is running on port ${PORT} - 
      Write on http://${process.env.INFLUXDB}:${process.env.INFLUXDB_PORT}
    `
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
