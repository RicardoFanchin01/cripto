const { RSI } = require('technicalindicators');

function analisarRSI(candles) {
  const closes = candles.map(c => c.close);
  const rsi = RSI.calculate({ values: closes, period: 14 });

  const ultimoRSI = rsi[rsi.length - 1];
  const ultimoClose = closes[closes.length - 1];

  console.log(`Preço atual: $${ultimoClose.toFixed(2)} | RSI: ${ultimoRSI.toFixed(2)}`);

  if (ultimoRSI < 30) {
    console.log('🔵 Sinal de COMPRA!');
  } else if (ultimoRSI > 70) {
    console.log('🔴 Sinal de VENDA!');
  } else {
    console.log('⚪ Neutro.');
  }
}

module.exports = { analisarRSI };
