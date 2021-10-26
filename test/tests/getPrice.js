const axios = require("axios");

axios.get("https://api.nano.to/price").then(res=>{
    if (res.data.symbol === "NANO" && res.data.currency === "USD") {
        console.log(`Check Price (USD):`, '\x1b[32m', "Ok", '\x1b[0m')
    } else {
        console.log(`Check Price (USD):`, '\x1b[41m', "Error", '\x1b[0m')
    }
}).catch(error=>{
    console.log(error.response.data);
});

axios.get("https://api.nano.to/price?symbol=BAN&currency=CAD").then(res=>{
    if (res.data.symbol === "BAN" && res.data.currency === "CAD") {
        console.log(`Check Price (CAD):`, '\x1b[32m', "Ok", '\x1b[0m')
    } else {
        console.log(`Check Price (CAD):`, '\x1b[41m', "Error", '\x1b[0m')
    }
}).catch(error=>{
    console.log(`Check Price (CAD):`, '\x1b[41m', "Error", '\x1b[0m')
});