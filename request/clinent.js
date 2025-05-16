const axios = require('axios');

const TOTAL_REQUESTS = 400;
let completed = 0;

for (let i = 0; i < TOTAL_REQUESTS; i++) {
  axios.get('http://localhost:8080/')
    .then(() => {
      completed++;
      if (completed === TOTAL_REQUESTS) {
        console.log(`Hoàn thành ${TOTAL_REQUESTS} request.`);
      }
    })
    .catch((err) => {
      console.error('Lỗi:', err.message);
    });
}
