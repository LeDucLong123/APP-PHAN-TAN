const express = require("express");
const { readAllWebRequests } = require("./query");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.get("/api/data", async (req, res) => {

  const data = await readAllWebRequests();

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

  res.send(result);
});

app.get("api/json", async (req, res) => {
  const data = await readAllWebRequests();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
