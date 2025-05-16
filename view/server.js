const express = require("express");
const path = require("path");

const app = express();
const PORT = 3005;

// Không cần set view engine
app.use(express.static(__dirname)); // Để phục vụ file tĩnh nếu cần

// Route để gửi file HTML thuần
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"chart.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
