const axios = require("axios");

function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

axios.get(`https://api.nano.to/reserve/${makeid(10)}`).then(res=>{
    if (res.data.url.includes("https://api.nano.to/checkout/")) {
        console.log(`Reserve Name:`, '\x1b[32m', "Ok", '\x1b[0m')
    } else {
        console.log(`Reserve Name:`, '\x1b[41m', "Error", '\x1b[0m')
    }
}).catch(error=>{
    console.log(`Reserve Name:`, '\x1b[41m', "Error", '\x1b[0m')
});