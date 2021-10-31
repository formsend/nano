const axios = require("axios");

axios.get("https://api.nano.to/history/nano_1bc8gx518sp55o6nmxw8n9hh9uco8mig9suy79s4mo59dsr7uz84gbfkb7w1").then(res=>{
    if (res.data[0].hash === "29891E93560EDD01F1637C23569D63C4968FFA0AC500D2E595269D55F3159F5E") {
        console.log(`Get History:`, '\x1b[32m', "Ok", '\x1b[0m')
    } else {
        console.log(`Get History:`, '\x1b[41m', "Error", '\x1b[0m')
    }
}).catch(error=>{
    console.log(`Get History:`, '\x1b[41m', "Error", '\x1b[0m')
});