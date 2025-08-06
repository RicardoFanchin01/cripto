const { getCandles } = require('./fetchData');
const { calcularRSI } = require('./rsiCalc');
const { enviarMensagem } = require('./alertaTelegram');

let ultimoAlerta = null;

async function monitorarRSI() {
  try {
    const candles = await getCandles('BTCUSDT', '1m', 100);
    const closes = candles.map(c => c.close);
    const rsi = calcularRSI(closes);
    const ultimoRSI = rsi[rsi.length - 1];
    const precoAtual = closes[closes.length - 1];

    if (!ultimoRSI) return;

    if (ultimoRSI < 30 && ultimoAlerta !== 'compra') {
      await enviarMensagem(`🔵 Hora de comprar!\nRSI está baixo: ${ultimoRSI.toFixed(2)}\nPreço BTC: $${precoAtual.toFixed(2)}`);
      ultimoAlerta = 'compra';
    } else if (ultimoRSI > 70 && ultimoAlerta !== 'venda') {
      await enviarMensagem(`🔴 Hora de vender!\nRSI está alto: ${ultimoRSI.toFixed(2)}\nPreço BTC: $${precoAtual.toFixed(2)}`);
      ultimoAlerta = 'venda';
    } else if (ultimoRSI >= 30 && ultimoRSI <= 70) {
      ultimoAlerta = null; // Reseta para poder alertar depois
    }

  } catch (err) {
    console.error('Erro ao monitorar RSI:', err);
  }
}

// Chama a função a cada minuto
setInterval(monitorarRSI, 60 * 1000);

monitorarRSI(); // Chamada inicial
