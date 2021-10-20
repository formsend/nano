![Cover](https://raw.githubusercontent.com/formsend/nano/master/.github/banner.png)

# **[Nano.to](https://nano.to) is a free crypto payment API built for the NANO blockchain.** 

Use this API to create payment pages (like Stripe Checkout) for NANO payments. Accesible from any internet connected device with a modern web browser. Anonymous, no account or API key required to use.

Launched **September 15th, 2021**.  **We're still in Beta**. API is stable. More endpoints and complex operations are planned in the future. Enterprise planned for late 2022.

[NANO](https://nano.org) is a fee-less, decentralized crypto currency. **We did not built or own NANO.** We simply built a service on top of it. In the process, these public API endpoints were made available. 

**We can't wait to see what you build with it.**

### Live Demo: [nano.to/moon](https://nano.to/moon?title=Github%20Demo&success_url=https://media3.giphy.com/media/vCKC987OpQAco/giphy.gif&description=This%20is%20a%20live%20test.%20This%20NANO%20address%20is%20the%20nano.to%20official%20address.&success_url=https://media3.giphy.com/media/vCKC987OpQAco/giphy.gif&cancel_url=https://github.com/formsend/nano)

# Table of Contents

Bounty: 1 NANO

Send a PR [request](https://github.com/formsend/nano/pulls).

# Basic Usage

```sh
https://nano.to/[NANO_ADDRESS_OR_USERNAME]
```

Example:

```sh
https://nano.to/nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o
```

Example with a Username:

```sh
https://nano.to/Moon
```

Visit [https://nano.to](https://nano.to/) to reserve your Username.

# Customize

```sh
https://nano.to/[NANO_ADDRESS_OR_USERNAME]?title=Donate&price=50
```

All Options:

```bash
?title=Donate
&price=50
&description=<p>HTML allowed</p>
&suggest=Basic:30,Premium:50
&success_url=https://mywebsite.com/success?id={{id}}
&cancel_url=https://mywebsite.com/
```

## POST: Checkout Pages (More Secure)

The same as before, and more advanced params can be passed in the body. 

```
https://nano.to/[NANO_ADDRESS_OR_USERNAME]
```

```javascript
// npm install axios

axios.post('https://nano.to/[NANO_ADDRESS_OR_USERNAME]', {
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
    "success_url": "https://mywebsite.com/success?id={{id}}&anotherParam=hello",
    "cancel_url": "https://google.com",
    "webhook_url": "https://mywebsite.com/secret-webhook",
    "webhook_secret": "my-super-secret",
    "metadata": { "userId": "joemama" }
})
```

Example response:

```
{
    "id": "666ee7bf26a",
    "url": "https://api.nano.to/checkout/666ee7bf26a",
    "exp": "2021-09-23T01:51:23.853Z"
}
```

You can check the data of a Checkout within it's lifespan by appending '?json=true' to the 'url' as a GET request. 

```
GET: https://api.nano.to/checkout/666ee7bf26a?json=true
```
---

### Payments Notifications with Webhooks

Add a 'webhook_url' param in a POST request body to recieve a HTTPS POST request when a payment is made using a Nano.to Checkout page. The Webhook JSON body will look like this:

```javascript
{
    id: '6e9d1f58c40',
    status: 'complete',
    amount: 1,
    method: {
        symbol: 'nano',
        address: '[YOUR_ADDRESS]',
        name: 'Nano',
        rate: '5.43262',
        amount: '0.18621',
        value: '1.01',
        raw: false
    },
    plan: {
        price: 1,
        name: '1 Month'
    },
    block: {
        type: 'pending',
        amount: '0.18621',
        hash: '6EE79D2BA2A8995179......',
        source: '[THEIR_ADDRESS]',
        timestamp: null,
        amount_raw: '186210000000000000000000000000'
    },
    metadata: {
        id: 'joemama'
    }
}
```

**Note:** While in Beta, API data structure may change. Checkouts data is stored in-memory and expire after 12 hours.

---

### RAW Amount in QR Codes (Natrium Support)

The API currently supports the following URI schema:

```
nano:nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o?amount=1000
```

The amount in MEGA (not RAW). See this [issue](https://github.com/formsend/nano.to/issues/4) for more info.

To force RAW, you can pass an optional url param to force the API to generate RAW friendly QR Codes. 

```
https://nano.to/moon?raw=true
```

```
https://nano.to/moon?title=Donate&price=10&raw=true
```

Clicking (or Tapping) the QR Code while using Raw mode will open Natrium and automatically fill in amount and address, on most phones. 

---

# Advanced Usage (API)

### Base URL

```
https://api.nano.to
```

The API is accesed only on HTTPS by GET or POST request. You can use the browser for most GET endpoints. POST requests require something like [Postman](https://www.postman.com/) or a backend server. 

---

### Authentication

Nano.to API is free, and open to the world. The API is built to operate 24/7, 365 days per year, globally. 

To use the API you do **not** need an API key. 

Your IP Address is your API key. Don't abuse it.

---

### Rate Limiting

On most endpoints, you can expect to have 5 requests, per second. **This is plenty for most use cases.** Hitting the limit multiple times per day may result in longer lockouts or permanent ban.

If you need lots of simultaneous API calls, please let us know in advanced. 

Email [Formsend](mailto:hello@forward.miami?subject=Nano.to&nbsp;Api&nbsp;Use), subject line 'Nano.to Api Use'. 

---

## GET: Live NANO Price

Get current NANO price in USD. The price is refreshed every 60 seconds. CoinMarketCap is used for price data.

```bash
https://api.nano.to/price
```

Response

```javascript
{
    "symbol": "NANO",
    "price": 4.93371887482106,
    "timestamp": "2021-09-23T01:57:52.020Z"
}
```

You can pass URL query parameters to change your request. **Bonus:** You can get other crypto prices as well.

**Params**

|  name |  type |  description
|---|---|---|
|   symbol | string |  Crypto symbol. **Default** NANO |
|   currency | string |  [ISO-4217](https://docs.1010data.com/1010dataReferenceManual/DataTypesAndFormats/currencyUnitCodes.html) symbol. **Default** USD |

Demo: https://api.nano.to/price

Demo (Advanced): https://api.nano.to/price?symbol=ETH&currency=CYN

---

## GET: Nano Username 

Usernames are aliases for NANO addresses. You can rent one [here](https://nano.to).

```bash
https://api.nano.to/name/moon
```

Response

```
{
	"id": "0c873b370ee",
	"status": "Active",
	"address": "nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o",
	"namespace": "moon",
	"expires": "September 16, 2030 7:27 PM",
	"created": "September 15, 2021 7:27 PM",
	"updated": "September 17, 2021 8:39 PM"
}
```

---

## GET: NANO Address Balance

Basic Blockchain information of any NANO address. Including balance.

```bash
https://api.nano.to/account/[NANO_ADDRESS]
```

Response

```javascript
{
	"balance": "0.794048",
	"block_count": "248",
	"account_version": "2",
	"confirmation_height": "248",
	"representative": "nano_3kqdiqmqiojr1aqqj51aq8bzz5jtwnkmhb38qwf3ppngo8uhhzkdkn7up7rp",
	"weight": "0",
	"pending": "0.02064",
	"balance_raw": "794048000000000000000000000000",
	"pending_raw": "20640000000000000000000000000",
	"usd_rate": "5.40",
	"usd_value": "4.29",
	"address": "nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o",
	"username": "moon",
	"aliases": [ "formsend", "moon" ]
}
```

**Params**

No additional params.

Demo: https://api.nano.to/account/moon

---

## GET: NANO Address Pending Blocks

Array of pending blocks i.e transactions for a NANO address.

```bash
https://api.nano.to/pending/[NANO_ADDRESS]
```

Response

```javascript
[
	{
		"type": "pending",
		"amount": "0.02112",
		"hash": "844FFE6D39D1F28673198E7C35A61C960148520FCBB8E2B2B0855C72D033FBF4",
		"source": "nano_19o64g3cy484nwfen76tfzz94icr1wn9bccw3ruefaham6x5hggpf6pz185x",
		"timestamp": null,
		"amount_raw": "21120000000000000000000000000"
	},
	// {..}
]
```

**Params**

No additional params.

Demo: https://api.nano.to/pending/moon

---

## GET: NANO Address History Blocks

Array of historical transactions of any NANO address. For now, API only goes back 20 transactions.  

```bash
https://api.nano.to/history/[NANO_ADDRESS]
```

Response

```javascript
[
	{
		"type": "state",
		"representative": "nano_3kqdiqmqiojr1aqqj51aq8bzz5jtwnkmhb38qwf3ppngo8uhhzkdkn7up7rp",
		"link": "F082A253FD6BD1376F28256A0F342CBD5FF1A3A8848359487119EA10EC06CF09",
		"balance": "0.215288",
		"previous": "F082A253FD6BD1376F28256A0F342CBD5FF1A3A8848359487119EA10EC06CF09",
		"subtype": "receive",
		"account": "nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o",
		"amount": "0.02143",
		"local_timestamp": "1634161570",
		"height": "244",
		"hash": "94E74C2EDAE153C181858BD28CFB67BA990EC8D1C43427658A118C947121A995",
		"work": "610bb7829e958415",
		"signature": "E09B7AF936EE4CE248630F4D03407B5BB40E258FC06B841472A30FE4FF423962F5E2201BAB321B39C10C250169D8033EB1600D9D58E39B271B2B58CC7CDB9508",
		"timestamp": null,
		"balance_raw": "215288000000000000000000000000",
		"amount_raw": "21430000000000000000000000000"
	},
	// {...}
]
```

**Params**

No additional params.

Demo: https://api.nano.to/history/moon

---

## GET: NANO Transaction By Amount

Check if a NANO address has received a payment with a specific amount. **Searches Pending & History.** This is useful if you want to built your own payment checker.

```bash
https://api.nano.to/payment/[NANO_ADDRESS]/[AMOUNT]
```

```bash
https://api.nano.to/payment/nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o/0.02143
```

**Amount must be in decimal (MEGA) not RAW.**

Response

```javascript
{
	"type": "state",
	"representative": "nano_3kqdiqmqiojr1aqqj51aq8bzz5jtwnkmhb38qwf3ppngo8uhhzkdkn7up7rp",
	"link": "F082A253FD6BD1376F28256A0F342CBD5FF1A3A8848359487119EA10EC06CF09",
	"balance": "0.215288",
	"previous": "F082A253FD6BD1376F28256A0F342CBD5FF1A3A8848359487119EA10EC06CF09",
	"subtype": "receive",
	"account": "nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o",
	"amount": "0.02143",
	"local_timestamp": "1634161570",
	"height": "244",
	"hash": "94E74C2EDAE153C181858BD28CFB67BA990EC8D1C43427658A118C947121A995",
	"work": "610bb7829e958415",
	"signature": "E09B7AF936EE4CE248630F4D03407B5BB40E258FC06B841472A30FE4FF423962F5E2201BAB321B39C10C250169D8033EB1600D9D58E39B271B2B58CC7CDB9508",
	"balance_raw": "215288000000000000000000000000",
	"amount_raw": "21430000000000000000000000000"
}
```

Example: [https://api.nano.to/payment/nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o/0.02143](https://api.nano.to/payment/nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o/0.02143)

If no transaction is found, the response will be false.

**Params**

No additional params.

---

## 👤 Author

**Formsend.org**

* Github: [@formsend](https://github.com/formsend)
* Website: [https://formsend.org](https://formsend.org)

---

## 🤝 Contributing

Give a ⭐️ if this project helped you!

Contributions, issues and feature requests are welcome! Feel free to check [issues page](https://github.com/formsend/nano/issues).

---

## ♥️ Donate 

We accept Crypto donations at the following addresses:

Nano.to Link: [nano.to/moon](https://nano.to/moon?title=Donate&suggest=Nice%20Job:10,Keep%20it%20up:25,Nice%20UI:50,Nano%20to%20Moon%20%F0%9F%9A%80:100?success_url=https://assets.entrepreneur.com/content/3x2/2000/20141106185423-5-powerful-ways-give-thanks-your-people.jpeg&cancel=https://github.com/formsend/nano)

```
# Nano
nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o

# Bitcoin
bc1qcgvew2a7ta3f7xy5999tdwyd8clrvdtpe2uvj5

# Doge
D9U1FLygkMydx3DE2sXgnuFpHm7ePm3Zwe

# Ethereum
0xdD4691Dc9562FB262e4b2076bE255303243f271d
```

---

## Stargazers

[![Stargazers over time](https://starchart.cc/formsend/nano.svg)](https://starchart.cc/formsend/nano)
