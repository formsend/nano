const axios = require("axios");

axios.get(`https://nano.to`).then(res => {
    if (res.data === "") {
        console.log(`Name:`, '\x1b[32m', "Ok", '\x1b[0m')
    } else {
        console.log(`Name:`, '\x1b[41m', "Error", '\x1b[0m')
    }
}).catch(error => {
    console.log(`Name:`, '\x1b[41m', "Error", '\x1b[0m')
});