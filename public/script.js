const priceCtx = document.getElementById('priceChart').getContext('2d');
const rsiCtx = document.getElementById('rsiChart').getContext('2d');

let priceChart, rsiChart;

async function fetchData() {
  const res = await fetch('/api/dados');
  return res.json();
}

function atualizarGraficos(dados) {
  const labels = dados.map(d => d.time);
  const closes = dados.map(d => d.close);
  const rsi = dados.map(d => d.rsi);

  if (!priceChart) {
    priceChart = new Chart(priceCtx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Preço BTC/USDT',
          data: closes,
          borderColor: 'lime',
          backgroundColor: 'transparent'
        }]
      },
      options: { scales: { x: { ticks: { color: '#ccc' } }, y: { ticks: { color: '#ccc' } } } }
    });
  } else {
    priceChart.data.labels = labels;
    priceChart.data.datasets[0].data = closes;
    priceChart.update();
  }

  if (!rsiChart) {
    rsiChart = new Chart(rsiCtx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'RSI',
          data: rsi,
          borderColor: 'cyan',
          backgroundColor: 'transparent'
        }]
      },
      options: {
        scales: {
          x: { ticks: { color: '#ccc' } },
          y: {
            min: 0, max: 100,
            ticks: { color: '#ccc' },
            grid: { color: '#444' }
          }
        },
        plugins: {
          annotation: {
            annotations: {
              line1: { type: 'line', yMin: 30, yMax: 30, borderColor: 'green', borderWidth: 1 },
              line2: { type: 'line', yMin: 70, yMax: 70, borderColor: 'red', borderWidth: 1 }
            }
          }
        }
      }
    });
  } else {
    rsiChart.data.labels = labels;
    rsiChart.data.datasets[0].data = rsi;
    rsiChart.update();
  }
}

// Atualiza a cada 60s
setInterval(async () => {
  const dados = await fetchData();
  atualizarGraficos(dados);
}, 60000);

fetchData().then(atualizarGraficos);
https://api.telegram.org/7364812269:AAHthscdGpjt1ELYKncGTHe66ENYrOtWm9E/getUpdates