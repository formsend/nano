const axios = require("axios");

axios.get("https://api.nano.to/account/nano_1bc8gx518sp55o6nmxw8n9hh9uco8mig9suy79s4mo59dsr7uz84gbfkb7w1").then(res => {
    if (typeof res.data.balance == "string") {
        console.log(`Get Balance:`, '\x1b[32m', "Ok", '\x1b[0m')
    } else {
        console.log(`Get Balance:`, '\x1b[41m', "Error", '\x1b[0m')
    }
}).catch(error => {
    console.log(`Get Balance:`, '\x1b[41m', "Error", '\x1b[0m')
});