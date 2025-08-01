const { RSI } = require('technicalindicators');

function calcularRSI(closes, periodo = 14) {
  return RSI.calculate({ values: closes, period: periodo });
}

module.exports = { calcularRSI };
