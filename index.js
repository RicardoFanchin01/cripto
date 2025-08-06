const { getCandles } = require('./fetchData');
const { analisarRSI } = require('./strategy');

async function executar() {
  const candles = await getCandles('BTCUSDT', '1m', 100);
  analisarRSI(candles);
}

// Rodar a cada minuto
setInterval(executar, 60 * 1000);
executar();
