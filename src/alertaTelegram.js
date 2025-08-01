// src/alertaTelegram.js
require('dotenv').config();

const axios = require('axios');

async function enviarMensagem(mensagem) {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;



  if (!token || !chatId) {
    console.error("❌ Token ou Chat ID não definidos.");
    return;
  }

  try {
    const res = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: mensagem
    });

    console.log("✅ Mensagem enviada:", res.data);
  } catch (error) {
    console.error("❌ Erro ao enviar mensagem:", error.response?.data || error.message);
  }
}

module.exports = { enviarMensagem };
