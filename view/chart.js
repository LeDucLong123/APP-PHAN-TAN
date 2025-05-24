const ctx = document.getElementById("myChart").getContext("2d");

fetch("http://localhost:3004/api/data")
  .then((res) => res.json())
  .then((data) => {
    const times = data.map((item) => item.time);
    const request_count = data.map((item) => item.request_count);

    const backgroundGradientPlugin = {
      id: "canvasGradientBackground",
      beforeDraw: (chart) => {
        const { ctx, width, height } = chart;

        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "#B0DB9C"); // Màu trên (xanh nhạt)
        gradient.addColorStop(1, "#ffffff"); // Màu dưới (trắng)

        ctx.save();
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      },
    };

    const dataset = {
      label: "# of Requests",
      data: request_count,
      borderWidth: request_count.map(() => 2),
      borderColor: "#4ED7F1",
      backgroundColor: request_count.map(() => "#A8F1FF"),
    };

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: times,
        datasets: [dataset],
      },
      options: {
        responsive: true,
        animation: {
          duration: 1000,
          easing: "easeOutBounce",
          delay(ctx) {
            return ctx.dataIndex * 150;
          },
        },
        plugins: {
          tooltip: {
            enabled: true,
          },
        },
        onHover: (event, elements) => {
          const chart = event.chart;
          const dataset = chart.data.datasets[0];

          if (elements.length > 0) {
            const index = elements[0].index;

            dataset.backgroundColor = dataset.data.map((_, i) =>
              i === index ? "#4ED7F1" : "#A8F1FF"
            );
            dataset.borderWidth = dataset.data.map((_, i) =>
              i === index ? 5 : 2
            );

            chart.update("none");
          } else {
            // Reset tất cả cột
            dataset.backgroundColor = dataset.data.map(() => "#A8F1FF");
            dataset.borderWidth = dataset.data.map(() => 2);
            chart.update("none");
          }
        },
      },
      plugins: [backgroundGradientPlugin],
    });
  })
  .catch((err) => console.error(err));
