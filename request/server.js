const express = require("express");
const path = require("path");
const request = require("./request");

const app = express();
const PORT = process.env.PORT;

// Không cần set view engine
app.use(express.static(__dirname)); // Để phục vụ file tĩnh nếu cần

//xử lý post
app.use(express.urlencoded({ extended: true }));

// Route để gửi file HTML thuần
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "request.html"));
});

app.post("/request", async (req, res) => {
  if (req.body.request) {
    await request(req.body.host, req.body.request);
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log(`Request server is running on http://localhost:${PORT}`);
});
