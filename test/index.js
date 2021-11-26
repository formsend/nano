const axios = require("axios");
const server = require('@fwd/server')

var tests = [

    /*
    * NANO
    */

    {
        name: 'NANO.TO - Home',
        url: 'https://nano.to/',
        check: (content) => typeof content !== undefined,
    },

    {
        name: 'NANO.TO - Search',
        url: 'https://nano.to/search/esteban',
        check: (content) => content[0].text == "esteban",
    },

    {
        name: 'NANO.TO - Search',
        url: 'https://nano.to/search/2983923472398473',
        check: (content) => content[0].label == "available",
    },

    {
        name: 'NANO.TO - Price',
        url: 'https://nano.to/price',
        check: (content) => typeof content.price !== undefined,
    },

    {
        name: 'NANO.TO - Username',
        url: 'https://nano.to/name/moon',
        check: (content) => typeof content.expires !== undefined,
    },

    {
        name: 'NANO.TO - Account',
        url: 'https://nano.to/pending/moon',
        check: (content) => (typeof content == "array" || typeof content == "object"),
    },

    {
        name: 'NANO.TO - History',
        url: 'https://nano.to/history/moon',
        check: (content) => (typeof content == "array" || typeof content == "object"),
    },

    {
        name: 'NANO.TO - Hash',
        url: 'https://nano.to/hash/A341FBD3942B411D98BAC16241E5BC149DBE0D54D9BB23A873BC2A2C2B92B113',
        check: (content) => typeof content.account_url !== undefined,
    },

    {
        name: 'NANO.TO - Payment',
        url: 'https://nano.to/payment/nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o/0.02143',
        check: (content) => typeof content.message !== undefined,
    },

    {
        name: 'NANO.TO - Qr Code',
        url: 'https://nano.to/qrcode/Moon',
        check: (content) => typeof content !== undefined,
    },

    {
        name: 'NANO.TO - Qr Code w/ Amount',
        url: 'https://nano.to/qrcode/Moon/0.02143',
        check: (content) => typeof content !== undefined,
    },

    {
        name: 'NANO.TO - Qr Code w/ Random Amount',
        url: `https://nano.to/qrcode/Moon/${Math.random()}`,
        check: (content) => typeof content !== undefined,
    },

]

async function check(group) {
    var _status = []
    var index = 0
    for (var website of ( group ? tests.filter(a => a.url.toLowerCase().includes(group.toLowerCase())) : tests )) {
        try {

            var startTime = new Date()

            var url = website && website.url ? website.url : website
            var results = await axios.get(`https://${url.replace('http://', '').replace('https://', '')}`, {
                timeout: 10000
            });

            if (website.check) {
                if (website.check(results.data)) {
                    var endTime = new Date()
                    var elapsed = endTime - startTime
                    _status.push(`${website && website.name ? website.name : website}: ${parseInt(elapsed) <= 2000 ? 'OK' : 'SLOW'} (${elapsed} ms)`)
                } else {
                    _status.push(`${website && website.name ? website.name : website}: Error (${endTime - startTime} ms)`)
                }
                // return
            } else {

                var endTime = new Date()
                var elapsed = endTime - startTime

                if (results.data.length > 100) {
                    _status.push(`${website && website.name ? website.name : website}: ${elapsed <= 1000 ? 'OK' : 'SLOW'} (${endTime - startTime} ms)`)
                } else {
                    _status.push(`${website && website.name ? website.name : website}: Error (${endTime - startTime} ms)`)
                }

            }

        } catch (e) {
            _status.push(`${website && website.name ? website.name : website}: Error`)
        }
        console.log(_status[index])
        index++
    }
    return _status
}

if (require.main === module) {
    // called directly
    ;(async () => await check())()
} else {
    // required as a module
    module.exports = check
}

