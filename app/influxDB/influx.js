const { InfluxDB, Point } = require("@influxdata/influxdb-client");

// ⚠️ Thay thế thông tin kết nối ở đây
const url = `http://${process.env.INFLUXDB}:${process.env.INFLUXDB_PORT}`;
const token = "my-super-secret-token";
const org = "longgroup";
const bucket = "longbucket";

const client = new InfluxDB({ url, token });
const writeApi = client.getWriteApi(org, bucket);
writeApi.useDefaultTags({ app: "long-nodejs-app" });

module.exports = { writeApi, Point };
