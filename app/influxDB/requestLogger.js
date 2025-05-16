const { writeApi, Point } = require("./influx");

function requestLogger(req, res, next) {
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const durationMs = diff[0] * 1000 + diff[1] / 1e6;

    const point = new Point("web-requests")
      .tag("method", req.method)
      .tag("path", req.path)
      .tag("port", process.env.PORT)
      .intField("status", res.statusCode)
      .floatField("duration_ms", durationMs);

    writeApi.writePoint(point);
  });

  next();
}

module.exports = requestLogger;
