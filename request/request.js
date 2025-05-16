const axios = require("axios");

async function request(url, rn) {
  const promises = [];

  for (let i = 0; i < rn; i++) {
    promises.push(
      axios.get(url).catch((err) => {
        console.error(`Lỗi ở request ${i}:`, err.message);
      })
    );
  }

  await Promise.all(promises); // Đợi tất cả xong
  console.log(`✅ Complete ${rn} request.`);
}

module.exports = request;
