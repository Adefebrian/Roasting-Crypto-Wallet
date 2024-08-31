const axios = require('axios');
const fs = require('fs');

const apiKey = 'API_KEY_MORALIS_KALIAN'; //ambil di https://admin.moralis.io/register

async function getNetWorth(walletAddress, chains) {
  try {
    const chainsParam = chains.map(chain => `chains[]=${chain}`).join('&');
    const response = await axios.get(`https://deep-index.moralis.io/api/v2.2/wallets/${walletAddress}/net-worth?${chainsParam}&exclude_spam=true&exclude_unverified_contracts=true`, {
      headers: {
        'accept': 'application/json',
        'X-API-Key': apiKey
      }
    });
    return response.data.total_networth_usd;
  } catch (error) {
    console.error('Error fetching net worth data:', error.message);
    return null;
  }
}

module.exports = getNetWorth;
