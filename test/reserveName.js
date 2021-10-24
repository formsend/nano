const axios = require("axios");

function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

axios.get(`https://api.nano.to/reserve/${makeid(10)}`).then(res=>{
    console.log(res.data);
}).catch(error=>{
    console.log(error.response.data);
});