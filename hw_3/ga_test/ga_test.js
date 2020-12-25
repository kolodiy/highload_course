const express = require('express');
const fetch = require('node-fetch');
const ua = require('universal-analytics')

const app = express();
app.enable('trust proxy');

app.get('/', async (req, res, next) => {
  let result;
  let visitor = ua('UA-186092715-2')
  try {
    result = await fetch("https://wax.cryptolions.io/v1/history/get_actions", {
      body: JSON.stringify({"account_name":"1"}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    let body = await result.json();
    console.log(body.last_irreversible_block)
    visitor.event("latest_irreversible_transaction", body.last_irreversible_block, new Date().toISOString()).send()
    res.status(200).send('Event tracked.').end();
  } catch (error) {
    next(error);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});