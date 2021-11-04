const Axios = require('axios');
const Convert = require('./utilities/convert');
const Currency = require('nanocurrency')
const QRCode = require('qrcode')

const Nano = {

  url: 'https://nano.to',

  /**
     * Big Number Conversion API
     * */
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

  /**
     * General information about address, including balance.
     * */
  account: async (address) => {
    if (!address) return new Error('First parameter, NANO Address is missing.');
    const account = await Axios.get(`${Nano.url}/account/${address}`);
    return account.data;
  },

  // alias
  address: this.account,

  /**
     * Get pending payments
     * */
  pending: async (address) => {
    if (!address) return new Error('First parameter, NANO Address is missing.');
    const pending = await Axios.get(`${Nano.url}/pending/${address}`, { maxContentLength: 52428890 });
    return pending.data;
  },

  /**
  * Get payment history
  * */
  history: async (address) => {
    if (!address) return new Error('First parameter, NANO Address is missing.');
    const history = await Axios.get(`${Nano.url}/history/${address}`, { maxContentLength: 52428890 });
    return history.data;
  },

  /**
  * Checkout POST API
  * */
  checkout: {
    get: async (id) => {
      if (!id) return new Error('First parameter, Checkout id is missing.');
      const checkout = await Axios.get(`https://nano.to/checkout/${id}?json=true`);
      return checkout.data;
    },
    create: async (data) => {
      if (!data) return new Error('First parameter, Checkout body is missing.');
      const checkout = await Axios.post('https://nano.to', data);
      return checkout.data;
    },
  },

  /**
    * Short Names :)
    * */
  name: async (name) => {
    if (!name) return new Error('First parameter, Nano.to Name is missing.');
    var name = await Axios.get(`${Nano.url}/name/${name}`);
    return name.data;
  },

  // alias
  username: this.name,

  /**
  * QrCode API
  * TODO
  * */
  qrCode: async (address, amount, color, background, prepend) => {
    return new Promise((resolve) => {
      QRCode.toDataURL(`${prepend ? prepend : 'nano:'}${address}?amount=${amount}`, { color: { dark: color || "#000", light: background || '#FFF' } }, function (err, dataURL) {
        resolve(dataURL);
      });
    });
  },

  /**
  * Wallet API
  * TODO
  * */
  // wallet: async (config) => ({
  //   send(to, amount) {},
  //   receive() {},
  //   create(name, seed) {},
  //   backup() {},
  // }),

  /**
  * Representative API
  * TODO
  * */
  // representative: {
  //   list(address) {},
  //   create() {}, // ;)
  // },

  /**
  * Blockchain Helpers
  * */
  blockchain: {
  
    findBlockByAmount: async (address, amount) => {
      if (!address) return new Error('First parameter, NANO Address is missing.');
      const payment = await Axios.get(`${Nano.url}/payment/${address}/${amount}`);
      return payment.data;
    }

  }

}

// import currency package
// Nano.blockchain = {}
Object.keys(Currency).map(a => a == 'Unit' ? Nano.blockchain['units'] = Currency[a] : Nano.blockchain[a] = Currency[a] );

// aliases
Nano.address = Nano.account
Nano.username = Nano.name
Nano.payment = Nano.blockchain.findBlockByAmount

Nano.qr = Nano.qrCode
Nano.qrcode = Nano.qrCode
Nano.QrCode = Nano.qrCode

Nano.order = Nano.checkout
Nano.invoice = Nano.checkout
Nano.purchase = Nano.checkout

console.log(Nano)

module.exports = Nano;
