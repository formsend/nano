const axios = require("axios");

axios.get("https://api.nano.to/hash/A341FBD3942B411D98BAC16241E5BC149DBE0D54D9BB23A873BC2A2C2B92B113").then(res=>{
    console.log(res.data);
}).catch(error=>{
    console.log(error.response.data);
});