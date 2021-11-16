const Axios = require('axios');
const Convert = require('./utilities/convert');
const Moment = require('moment');

const NanoClient = require("@dev-ptera/nano-node-rpc").NanoClient;

const Server = require('@fwd/api');

const Nano = {

  url: "http://[::1]:7076",

  NanoNode(url) {
    return new NanoClient({ url: url || this.url })
  },

  serve: (port) => {
    Server.limits = false;
    Server.serve([
        { path: '/:address/pending', action: async (req) => await Nano.pending(req.params.address) },
        { path: '/:address/balance', action: async (req) => await Nano.balance(req.params.address) },
        { path: '/:address/account', action: async (req) => await Nano.account(req.params.address) },
        { path: '/:address/history', action: async (req) => await Nano.history(req.params.address) },
        { path: '/:address/history/:amount', action: async (req) => await Nano.payment(req.params.address, req.params.amount) },
        { path: '/', action: async (req) => "It worked!" }
    ]);
    console.log("======================");
    console.log("Yeah.. Science, bitch!");
    console.log("======================");
    Server.start(port || 8080);
    console.log("======================");
  },

  /**
  * Big Number Conversion API
  **/
  toRaw: Convert.toRaw,
  fromRaw: Convert.fromRaw,

  /**
  * Live Price (CoinMarketCap)
  **/
  async price(currency, config) {

    let data;

    currency = currency || 'USD';

    const symbol = config && config.symbol ? config.symbol.toUpperCase() : 'NANO';

    if (typeof config === 'object' && (config.apiKey || config.key)) {
      const headers = { headers: { 'X-CMC_PRO_API_KEY': config.apiKey || config.key } };
      let price = await server.http.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}${currency !== 'USD' ? `&convert=${currency}` : ''}`, headers);
      data = {
        symbol: symbol.toUpperCase(),
        currency: currency.toUpperCase(),
        price: price.data.data[symbol].quote[currency].price,
        timestamp: price.data.status.timestamp,
      };
    } else {
      let price = await Axios.get(`https://nano.to/price?symbol=${symbol}&currency=${currency}`);
      data = price.data;
    }

    return config && config.timestamp ? data : data.price;

  },
    
  hash(hash) {
    return new Promise(async (resolve, reject) => {
      this.NanoNode()._send('block_info', { "json_block": true, "hash": hash })
      .then(block => resolve(block))
      .catch(e => resolve({ error: e.message }));
    })
  },

  account(address) {
    return new Promise(async (resolve, reject) => {
      this.NanoNode()._send('account_info', { "json_block": true, "account": address })
      .then(account => resolve(account))
      .catch(e => resolve({ error: e.message }));
    })
  },

  pending(address) {
    return new Promise(async (resolve, reject) => {
      this.NanoNode()._send('pending', { "json_block": true, "account": address, "count": "50", "source": true })
      .then(pending => {
        var response = []
        Object.keys(pending.blocks).map(hash => {
          response.push({
            hash: hash,
            amount: pending.blocks[hash].amount,
            source: pending.blocks[hash].source,
          })
        })
        response = response.map(a => {
          a.amount_raw = a.amount
          a.amount = a.amount ? Nano.fromRaw(a.amount) : a.amount
          // a.timestamp = Moment.unix(a.timestamp || a.local_timestamp)
          a.hash_url = `https://nano.to/${a.hash}/hash`
          // a.account_url = `https://nano.to/${a.account}/account`
          delete a.local_timestamp
          return a
        })
        return resolve(response)
      })
      .catch(e => resolve({ error: e.message }));
    })
  },

  history(address) {
    return new Promise(async (resolve, reject) => {
      this.NanoNode()._send('account_history', { "json_block": true, "account": address, "count": "50" })
      .then(account => {
        account.history = account.history.map(a => {
          a.amount_raw = a.amount
          a.amount = a.amount ? Nano.fromRaw(a.amount) : a.amount
          a.timestamp = Moment.unix(a.timestamp || a.local_timestamp)
          a.hash_url = `https://nano.to/${a.hash}/hash`
          a.account_url = `https://nano.to/${a.account}/account`
          delete a.local_timestamp
          return a
        })
        resolve(account.history)
      })
      .catch(e => resolve({ error: e.message }));
    })
  },

  balance(address) {
    return new Promise(async (resolve, reject) => {
      this.NanoNode().account_balance(address)
      .then(balance => resolve(balance))
      .catch(e => resolve({ error: e.message }));
    })
  },

  async payment(address, amount) {

        if (!address) return new Error("First parameter, NANO address is missing.")
        if (!amount) return new Error("Second parameter, NANO amount is missing.")

        var history = await this.history(address)
            history = history.find(a => a.amount == amount || a.amount == `${amount}0`) || false

        if (history && history.hash) {
            return history
        }

        var pending = await this.pending(address)
            pending = pending.find(a => a.amount == amount || a.amount == `${amount}0`) || false

        if (pending && pending.hash) {
            return pending
        }

        return false

  },
 
}

module.exports = Nano;
