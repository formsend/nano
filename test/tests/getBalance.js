const axios = require("axios");

const key = "Get Balance"

axios.get("https://nano.to/account/nano_1bc8gx518sp55o6nmxw8n9hh9uco8mig9suy79s4mo59dsr7uz84gbfkb7w1").then(res => {
    if (typeof res.data.balance == "string") {
        good(key)
    } else { bad(key) }
}).catch(error => bad(key));