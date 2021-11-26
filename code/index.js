const Axios = require('axios');
const Moment = require('moment');
const Server = require('@fwd/api');
const Convert = require('./utilities/convert');
const NanoClient = require("@dev-ptera/nano-node-rpc").NanoClient;
const Performance = require('perf_hooks').performance;

const Nano = {

  url: "http://[::1]:7076",

  NanoNode() {
    return new NanoClient({ url: this.url })
  },

  serve: (port, config) => {
    Server.limits = config.limits || false;
    Server.serve([
        { path: '/hash/:hash', action: async (req) => await Nano.rpc.hash(req.params.hash) },
        { path: '/:address/pending', action: async (req) => await Nano.rpc.pending(req.params.address) },
        { path: '/:address/balance', action: async (req) => await Nano.rpc.balance(req.params.address) },
        { path: '/:address/account', action: async (req) => await Nano.rpc.account(req.params.address) },
        { path: '/:address/history', action: async (req) => await Nano.rpc.history(req.params.address, req.query.count) },
        { path: '/:address/history/:amount', action: async (req) => await Nano.payment(req.params.address, req.params.amount) },
        { path: '/', action: async (req) => "It worked!" }
    ]);
    Server.start(port || 8080, null, config);
  },

  /**
  * Big Number Conversion API
  **/
  Convert,
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

  async username(username) {
    var username = await server.http.get(`${nano_api_uri}/${username}/username`)
    return username.data
  },

  async known(hash) {
    var known = await server.http.get(`${nano_api_uri}/known`)
    return known.data
  },

  async hash(hash) {
    var hash = await server.http.get(`${nano_api_uri}/hash/${hash}`)
    return hash.data
  },

  async account(address) {
    var account = await server.http.get(`${nano_api_uri}/${address}/account`)
    return account.data
  },
  
  async pending(address) {
    var pending = await server.http.get(`${nano_api_uri}/${address}/pending`)
    return pending.data
  },
  
  async history(address, count) {
    var history = await server.http.get(`${nano_api_uri}/${address}/history?count=${count || 50}`)
    return history.data
  },

  async balance(address) {
    var data = await server.http.get(`${nano_api_uri}/balance`)
  },

  async payment(address, amount) {

        if (!address) return new Error("First parameter, NANO address is missing.")
        if (!amount) return new Error("Second parameter, NANO amount is missing.")

        var history = await Nano.history(address)
            history = history.find(a => a.amount == amount || a.amount == `${amount}0`) || false

        if (history && history.hash) {
            return history
        }

        var pending = await Nano.pending(address)
            pending = pending.find(a => a.amount == amount || a.amount == `${amount}0`) || false

        if (pending && pending.hash) {
            return pending
        }

        return false

  },
    
  rpc: {

    hash(hash) {
      return new Promise(async (resolve, reject) => {
        this.NanoNode().block(hash)
        .then(block => resolve(block))
        .catch(e => {
          console.log(e)
          resolve({ error: e.message })
        });
      })
    },

    account(address, config) {
      return new Promise(async (resolve, reject) => {
        var _config = { "json_block": true, "account": address }
        if (config) Object.keys(config).map(a => _config[a] = config[a])
        this.NanoNode()._send('account_info', _config)
        .then(account => resolve(account))
        .catch(e => resolve({ error: e.message }));
      })
    },

    pending(address, config) {
      return new Promise(async (resolve, reject) => {
        var _config = { "json_block": true, "account": address, "count": "50", "source": true }
        if (config) Object.keys(config).map(a => _config[a] = config[a])
        this.NanoNode()._send('pending', _config)
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
            a.amount = Nano.fromRaw(a.amount)
            a.hash_url = `https://nano.to/hash/${a.hash}`
            return a
          })
          return resolve(response)
        })
        .catch(e => resolve({ error: e.message }));
      })
    },

    history(address, count, config) {
      return new Promise(async (resolve, reject) => {
        var _config = { "json_block": true, "account": address, "count": count || 50 }
        if (config) Object.keys(config).map(a => _config[a] = config[a])
        this.NanoNode()._send('account_history', _config)
        .then(account => {
          account.history = account.history.map(a => {
            a.amount_raw = a.amount
            a.amount = a.amount ? Nano.fromRaw(a.amount) : a.amount
            a.timestamp = Moment.unix(a.timestamp || a.local_timestamp)
            a.hash_url = `https://nano.to/hash/${a.hash}`
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

    send(config) {
      return new Promise(async (resolve) => {

        try {

        config.source = config.source || config.account || config.address
        config.recipient = config.recipient || config.to
        config.seed = config.seed || config.password || config.secret
        config.amount = config.amount

        // fetch
        if (!config.source) return resolve({ error: `Error: Config source wallet required.` })
        if (!config.seed) return resolve({ error: `Error: Config wallet seed required.` })
        if (!config.recipient) return resolve({ error: `Error: Config recipient required.` })
        if (!config.amount) return resolve({ error: `Error: Config amount required.` })

        var start = Performance.now();

        var balance = await Nano.account(config.source)

        if (config.amount == "max" || config.amount == "all") config.amount = _balance.nano

        if (String(config.amount).includes('$')) {
          config.amount = parseFloat(config.amount.replace('$', '')) / balance.usd
        }

        var new_balance = parseFloat(balance.nano) - parseFloat(config.amount)
            new_balance = Nano.toRaw(new_balance)

        if (parseFloat(balance.usd) < parseFloat(config.amount)) {
          return resolve({ error: "Error: Wallet does not have enough money.", `${balance.nano} NANO,`, `$${balance.usd}` })
        }

        var block = await client._send('block_create', {
          "json_block": true,
          "type": "state",
          "previous": balance.frontier,
          "account": config.source,
          "representative": balance.representative,
          "balance": new_balance,
          "link": config.recipient,
          "key": config.seed
        })

        // TOOD subtype flag
        var hash = await client._send('process', { "json_block": "true", "block": block.block })

        var end = Performance.now();

        resolve({
          duration: (((end - start) / 1000)  / 60) + ' minutes',
          url: `https://nano.to/hash/${hash.hash}`,
          hash, block
        })

        } catch (e) { resolve({ error: e.message }) }
      })
    },

  },
 
}

module.exports = Nano;
