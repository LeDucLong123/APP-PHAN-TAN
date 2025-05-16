const express = require("express");
const { readAllWebRequests } = require("./query");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname));

app.get("/", async (req, res) => {
  const data = await readAllWebRequests();
  //---------------------

  // Lọc chỉ lấy dòng có _field = "duration_ms"
  const filtered = data.filter((item) => item._field === "duration_ms");

  // Đếm số lượng request theo từng giây (theo _time cắt "HH:mm:ss")
  const countsBySecond = {};

  filtered.forEach((item) => {
    // Lấy phần giờ phút giây từ _time, vd: "15:23:08"
    const timeSecond = item._time_vn.split(" ")[0];
    countsBySecond[timeSecond] = (countsBySecond[timeSecond] || 0) + 1;
  });

  // Chuyển thành mảng để dễ xử lý / hiển thị
  const result = Object.entries(countsBySecond).map(([time, count]) => ({
    time,
    request_count: count,
  }));

  //---------------------

  

  const times = result.map((item) => item.time);
  const request_count = result.map((item) => item.request_count);
    // console.log(times);
  //   console.log(request_count);
  res.render("chart", { times, request_count });
});

app.get("/chart", async (req, res) => {
  res.render("chart");
});

app.get("/json", async (req, res) => {
  const data = await readAllWebRequests();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
