const axios = require("axios");

axios.get(`https://nano.to/qrcode/Moon`).then(res => {
    console.log(`Get QR Code:`, '\x1b[32m', "Ok", '\x1b[0m')
}).catch(error => {
    console.log(`Get QR Code:`, '\x1b[41m', "Error", '\x1b[0m')
});