const axios = require("axios");

axios.get("https://api.nano.to/name/moon").then(res=>{
    console.log(res.data);
}).catch(error=>{
    console.log(error.response.data);
});