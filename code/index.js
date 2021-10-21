const Axios = require('axios')
const Convert = require('./utilities/convert')

const Nano = {

    url: 'https://api.nano.to',

    /**
     * Big Number Conversion API
     **/
    toRaw: Convert.toRaw,
    fromRaw: Convert.fromRaw,

    /**
     * Live Price (CoinMarketCap)
     **/
    async price(currency, config) {

        var data

        currency = currency || 'USD'

        let symbol = config && config.symbol ?  config.symbol.toUpperCase() : 'NANO'

        if (typeof config == 'object' && (config.apiKey || config.key)) {

            let headers = { headers: { 'X-CMC_PRO_API_KEY': config.apiKey || config.key  } }
            var price = await server.http.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}${ currency !== 'USD' ? '&convert=' + currency : '' }`, headers)
            
            data = {  symbol: symbol.toUpperCase(), currency: currency.toUpperCase(), price: price.data.data[symbol].quote[currency].price, timestamp: price.data.status.timestamp }  

        } else {
            
            var price = await Axios.get(`https://api.nano.to/price?symbol=${symbol}&currency=${currency}`)
                data = price.data

        }

        return config && config.timestamp ? data : data.price

    },

    /**
     * General information about address, including balance.
     **/
    account: async (address) => {
        if (!address) return new Error("First parameter, NANO Address is missing.")
        var account = await Axios.get(`${Nano.url}/account/${address}`)
        return account.data
    },

    address: this.account,

    /**
     * Get pending payments
     **/
    pending: async (address) => {
        if (!address) return new Error("First parameter, NANO Address is missing.")
        var history = await Axios.get(`${Nano.url}/pending/${address}`)
        return history.data
    },


    /**
     * Check for a specific payment
     **/
    payment: async (address, amount) => {
        return await this.findBlockByAmount(address, amount)
    },

    /**
     * Get payment history
     **/
    history: async (address) => {
        if (!address) return new Error("First parameter, NANO Address is missing.")
        var history = await Axios.get(`${Nano.url}/history/${address}`)
        return history.data
    },

    /**
     * Checkout POST API
     **/
    checkout: async (body) => {
        if (!body) return new Error("First parameter, Checkout body is missing.")
        var checkout = await Axios.post(`https://nano.to`, body)
        return checkout.data
    },

    // aliases
    // order: this.checkout,
    // invoice: this.checkout,
    // purchase: this.checkout,
    // donation: this.checkout,

    /**
    * Short Names :)
    **/
    name: async (name) => {
        if (!name) return new Error("First parameter, Nano.to Name is missing.")
        var name = await Axios.get(`${Nano.url}/name/${name}`)
        return name.data
    },

    /**
     * QrCode API
     * TODO
     **/
    // qrCode: async (address, icon, amount) => {
    //     // psuedo code
    //     if (!address) return new Error("First parameter, Nano.to address is missing.")
    //     var qrCode = await Axios.get(`https://api.nano.to/qrcode/${address}`)
    //     return qrCode.data
    // },

    /**
     * Wallet API
     * TODO
     **/
    wallet: async (config) => {
        return {
            send(to, amount) {},
            receive() {},
            create(name, seed) {},
            backup() {},
        }
    },

    /**
     * Representative API
     * TODO
     **/
    representative: {
        list(address) {},
        create() {}, // ;)
    },

   /**
     * Blockchain Helpers
     **/

    findBlockByAmount: async (address, amount) => {
        if (!address) return new Error("First parameter, NANO Address is missing.")
        var payment = await Axios.get(`${Nano.url}/payment/${address}/${amount}`)
        return payment.data
    },


}

module.exports = Nano
