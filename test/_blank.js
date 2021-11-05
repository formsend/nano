const axios = require("axios");

const key = "Get Balance";

axios.get(`https://nano.to`).then(res => {
    if (typeof res.data == "string") good(key)
    else { bad(key) }
}).catch(error => bad(key));
