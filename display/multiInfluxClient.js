const { InfluxDB } = require("@influxdata/influxdb-client");

const configs = [
  {
    name: "node1",
    url: "http://localhost:8087",
    token: "my-super-secret-token",
    org: "longgroup",
  },
  {
    name: "node2",
    url: "http://localhost:8088",
    token: "my-super-secret-token",
    org: "longgroup",
  },
  {
    name: "node3",
    url: "http://localhost:8089",
    token: "my-super-secret-token",
    org: "longgroup",
  },
];

const clients = configs.map((cfg) => ({
  name: cfg.name,
  queryApi: new InfluxDB({ url: cfg.url, token: cfg.token }).getQueryApi(
    cfg.org
  ),
}));

module.exports = clients;
