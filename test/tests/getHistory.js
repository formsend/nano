const axios = require("axios");

axios.get("https://nano.to/history/nano_1bc8gx518sp55o6nmxw8n9hh9uco8mig9suy79s4mo59dsr7uz84gbfkb7w1").then(res=>{
    if (res.data[0] && typeof res.data[0].hash == "string") {
        console.log(`Get History:`, '\x1b[32m', "Ok", '\x1b[0m')
    } else {
        console.log(`Get History:`, '\x1b[41m', "Error", '\x1b[0m', res.data[0].hash)
    }
}).catch(error=>{
    console.log(`Get History:`, '\x1b[41m', "Error", '\x1b[0m')
});