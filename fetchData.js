const axios = require('axios');

async function getCandles(symbol = 'PEPEBRL', interval = '1m', limit = 100) {
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  const response = await axios.get(url);
  
  return response.data.map(c => ({
    time: c[0],
    close: parseFloat(c[4]),
  }));
}

module.exports = { getCandles };
