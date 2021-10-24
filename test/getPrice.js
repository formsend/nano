const axios = require("axios");

axios.get("https://api.nano.to/price").then(res=>{
    console.log(res.data);
}).catch(error=>{
    console.log(error.response.data);
});

axios.get("https://api.nano.to/price?symbol=SHIB&currency=CAD").then(res=>{
    console.log(res.data);
}).catch(error=>{
    console.log(error.response.data);
});