const ctx = document.getElementById("myChart");

fetch("http://localhost:3004/api/data")
  .then((res) => res.json())
  .then((data) => {
    const times = data.map((item) => item.time);
    const request_count = data.map((item) => item.request_count);

    new Chart(ctx, {
      type: "line",
      data: {
        labels: times,
        datasets: [
          {
            label: "# of Requests",
            data: request_count,
            borderWidth: 2,
            borderColor: "rgba(75, 192, 192, 1)",
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  })
  .catch((err) => console.error(err));
