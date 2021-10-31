const axios = require("axios")

function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

axios.get("https://nano.to/nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o").then(res => {
  if (res.request.res.responseUrl.includes("https://api.nano.to/checkout/")) {
    console.log(`Create Invoice (Get):`, '\x1b[32m', "Ok", '\x1b[0m')
  } else {
    console.log(`Create Invoice (Get):`, '\x1b[41m', "Error", '\x1b[0m')
  }
}).catch(error => {
  console.log(`Create Invoice (Get):`, '\x1b[41m', "Error", '\x1b[0m')
});