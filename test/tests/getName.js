const axios = require("axios");

axios.get("https://api.nano.to/name/moon").then(res => {
    if (res.data.address === "nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o") {
        console.log(`Get Name:`, '\x1b[32m', "Ok", '\x1b[0m')
    } else {
        console.log(`Get Name:`, '\x1b[41m', "Error", '\x1b[0m')
    }
}).catch(error => {
    console.log(`Get Name:`, '\x1b[41m', "Error", '\x1b[0m')
});