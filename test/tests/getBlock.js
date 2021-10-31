const axios = require("axios");

axios.get("https://api.nano.to/hash/A341FBD3942B411D98BAC16241E5BC149DBE0D54D9BB23A873BC2A2C2B92B113").then(res=>{
    if (res.data.signature === "AEE7BAD417803EC1F761EB7173CE6E8AB78AE0DBA5F3BF7286D058742C1BBE1DB4CD80D4139095D061C9FEC1277AA7EBFB3AC9F4EF582A2CEF338B29727BF80B") {
        console.log(`Get Block:`, '\x1b[32m', "Ok", '\x1b[0m')
    } else {
        console.log(`Get Block:`, '\x1b[41m', "Error", '\x1b[0m')
    }
}).catch(error=>{
    console.log(`Get Block:`, '\x1b[41m', "Error", '\x1b[0m')
});