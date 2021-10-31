const axios = require("axios");

axios.post(`https://nano.to/nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o`, {
    "title": "New Order",
    "plans": [
        { "name": "Fries", "price": 5 },
        { "name": "Burger", "price": 10 },
        { "name": "Happy Meal", "price": 15 },
        { "name": "Cookies 🍪", "price": 3 }
    ],
    "business": {
        "name": "McDonalds",
        "logo": "https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg"
    },
    "image": "https://files.muzli.space/2d7af141fab097859ef66de8d7c50932.jpeg",
    "color": "black,white",
    "background": "#00000,#311ac5",
    "success_url": "https://mywebsite.com/success?id={{id}}&anotherParam=hello",
    "cancel_url": "https://google.com",
    "webhook_url": "https://mywebsite.com/secret-webhook",
    "webhook_secret": "my-super-secret",
    "metadata": { "userId": "joe-mama" }
}).then(res => {
    if (res.data.url.includes("https://api.nano.to/checkout/")) {
        console.log(`Create Invoice (Post):`, '\x1b[32m', "Ok", '\x1b[0m')
    } else {
        console.log(`Create Invoice (Post):`, '\x1b[41m', "Error", '\x1b[0m')
    }
}).catch(error => {
    console.log(`Create Invoice (Post):`, '\x1b[41m', "Error", '\x1b[0m')
});