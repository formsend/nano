const axios = require("axios");

axios.get("https://api.nano.to/pending/nano_1bc8gx518sp55o6nmxw8n9hh9uco8mig9suy79s4mo59dsr7uz84gbfkb7w1").then(res=>{
    if (res.data.find(tx=>tx.hash==="8EFC78FA0D6EAFEF3B5F34CCB53948442F4CF01054ED9C9A48617854D4C79352")) {
        console.log(`Get Pending:`, '\x1b[32m', "Ok", '\x1b[0m')
    } else {
        console.log(`Get Pending:`, '\x1b[41m', "Error", '\x1b[0m')
    }
}).catch(error=>{
    console.log(`Get Pending:`, '\x1b[41m', "Error", '\x1b[0m')
});