const clients = require("./multiInfluxClient");

function convertToVietnamTime(utcString) {
  const date = new Date(utcString);
  return date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
}

function parseCustomDateTime(str) {
  // str dạng "18:16:22 16/5/2025"
  const [timePart, datePart] = str.split(' ');
  const [hours, minutes, seconds] = timePart.split(':').map(Number);
  const [day, month, year] = datePart.split('/').map(Number);

  // Lưu ý: tháng trong Date() là 0-based, nên cần trừ 1
  return new Date(year, month - 1, day, hours, minutes, seconds);
}

async function readAllWebRequests() {
  const fluxQuery = `
    from(bucket: "longbucket")
      |> range(start: -5h)
      |> filter(fn: (r) => r._measurement == "web-requests")
  `;

  const results = await Promise.all(
    clients.map((client) => {
      return new Promise((resolve) => {
        const data = [];
        client.queryApi.queryRows(fluxQuery, {
          next(row, tableMeta) {
            const o = tableMeta.toObject(row);
            o.node = client.name;
            
            // Chuyển đổi thời gian sang giờ Việt Nam
            if (o._time) {
              o._time_vn = convertToVietnamTime(o._time);
            }

            data.push(o);
          },
          error(error) {
            console.error(`❌ Query error from ${client.name}:`, error.message);
            resolve([]); // Không reject để các node khác vẫn chạy
          },
          complete() {
            resolve(data);
          },
        });
      });
    })
  );

  // Gộp tất cả dữ liệu từ 3 client
  const merged = results.flat();

  // Sort theo _timeRaw (ISO string) để có thứ tự thời gian đúng
  merged.sort((a, b) => {
    return new Date(a._time) - new Date(b._time);
  });

  return merged;
}

module.exports = { readAllWebRequests };
