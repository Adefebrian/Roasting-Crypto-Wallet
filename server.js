const express = require('express');
const bodyParser = require('body-parser');
const getNetWorth = require('./saldoKripto');
const generateRoastingMessage = require('./generateRoast');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/generate-roast', async (req, res) => {
  const { walletAddress, language } = req.body;

  try {
    const totalNetWorth = await getNetWorth(walletAddress, ['eth', 'bsc', 'polygon', 'avalanche', 'arbitrum', 'base', 'linea', 'optimism', '0x1', '0x89', '0x38', '0xa86a']);
    
    if (totalNetWorth !== null) {
      const roastingMessage = await generateRoastingMessage(totalNetWorth, language);
      res.json({ roast: roastingMessage });
    } else {
      res.status(500).json({ error: 'Failed to fetch net worth.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;
