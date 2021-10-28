![Cover](https://raw.githubusercontent.com/formsend/nano/master/.github/banner.png)

# **Free NANO Blockchain Payment API (Nano.to)** 

Use this API to create payment pages (like Stripe Checkout) for NANO crypto currency. Accessible from any internet connected device with a modern web browser. 

Anonymous, no account or API key required to use.

Launched **September 15th, 2021**. API is stable. More endpoints and complex operations are planned in the future. **Enterprise planned for late 2022.**

[NANO](https://nano.org) is a fee-less, decentralized crypto currency. 

**Note:** **We did not build or own NANO. We simply built a service on top of it.**

### Live Demo: [nano.to/moon](https://nano.to/Moon?title=Donate%20&price=50%20&donate=true%20&color=white,white%20&background=blue,purple%20&image=https://media3.giphy.com/media/cnuNz0fTBIUGnx4F9T/giphy.gif%20&description=%3Cp%3EHTML%20allowed%20%F0%9F%98%8E%3C/p%3E%20&suggest=Basic:30,Premium:50&cancel_url=https://github.com/formsend/nano)

---

# Table of Contents
* [Get Started](#basic-usage)
* [Simple Example](#simple-usage)
* [Advanced Example](#advanced-usage)
* [Payment Notifications](#payments-notifications-with-webhooks)
* [Themes & Colors](#themes--colors)
* [Nano.to API (Advanced Usage)](#advanced-usage-api)
	* [Base URL](#base-url)
	* [Authentication](#authentication)
	* [Rate Limiting](#rate-limiting)
	* [NANO Price](#get-live-nano-price)
	* [NANO Username](#get-nano-usernames)
	* [NANO Account](#get-nano-address-balance)
	* [NANO Address Pending Payments](#get-nano-address-pending-blocks)
	* [NANO Address Payment History](#get-nano-address-history-blocks)
	* [NANO Payment By Hash](#get-nano-block-by-hash)
	* [NANO Payment By Address & Amount](#get-nano-transaction-by-amount)
* [Author](#-author)
* [Contributing](#-contributing)
* [Donate](#%EF%B8%8F-donate)
* [Stargazers](#stargazers)

---

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

# Simple Usage

```sh
https://nano.to/[NANO_ADDRESS_OR_USERNAME]?title=Donate&price=50
```

Available Options:

```bash
https://nano.to/Moon?title=Donate
&price=50
&donate=true
&color=white
&background=blue,red
&image=https://media3.giphy.com/media/cnuNz0fTBIUGnx4F9T/giphy.gif
&description=<p>HTML allowed 😎</p>
&suggest=Basic:30,Premium:50
&success_url=https://mywebsite.com/success?id={{id}}
&cancel_url=https://mywebsite.com/
```

**Note:** Using CSS colors with hashtags ex. #000000 is supported, but replace the **#** with a **$** symbol.

Demo: [https://nano.to/Moon](https://nano.to/Moon?title=Donate%20&price=50%20&donate=true%20&color=white,white%20&background=blue,red%20&image=https://media3.giphy.com/media/cnuNz0fTBIUGnx4F9T/giphy.gif%20&description=%3Cp%3EHTML%20allowed%20%F0%9F%98%8E%3C/p%3E%20&suggest=Basic:30,Premium:50%20&success_url=https://mywebsite.com/success?id={{id}}%20&cancel_url=https://mywebsite.com/)

---

## Advanced Usage

More advanced options can be passed in the body of a POST request.

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
    "image": "https://files.muzli.space/2d7af141fab097859ef66de8d7c50932.jpeg", 
    "color": "black,white",
    "background": "#00000,#311ac5",
    "success_url": "https://mywebsite.com/success?id={{id}}&anotherParam=hello",
    "cancel_url": "https://google.com",
    "webhook_url": "https://mywebsite.com/secret-webhook",
    "webhook_secret": "my-super-secret",
    "metadata": { "userId": "joe-mama" }
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

You can check the data of a Checkout within its lifespan by appending '?json=true' to the 'url' as a GET request. 

```
https://api.nano.to/checkout/666ee7bf26a?json=true
```
---

### Payments Notifications with Webhooks

The recommended way to be notified of incoming payments is by passing a 'webhook_url' param in the body of a POST request. The JSON payload will look like this:

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
        amount_raw: '186210000000000000000000000000'
    },
    metadata: {
        id: 'joemama'
    }
}
```

**Note:** While in Beta, API data structure may change without notice. Checkouts data is stored in-memory and expires after 12 hours.

---

### Accessibility

Clicking (or Tapping) the QR Code will open Natrium and automatically fill in amount and address, on most phones. 

---

# Themes & Colors

![Cover](https://raw.githubusercontent.com/formsend/nano/master/.github/theme-1.png)

Customize colors and even add an image.

**GET Request**

```bash
https://nano.to/Moon?color=red,white
&background=blue,red
&image=https://media3.giphy.com/media/cnuNz0fTBIUGnx4F9T/giphy.gif
```

**Note:** Using CSS colors with hashtags ex. #000000 is supported, but replace the **#** with a **$** symbol.

**POST Request**

```javascript

axios.post('https://nano.to/[NANO_ADDRESS_OR_USERNAME]', {
    "image": "https://files.muzli.space/2d7af141fab097859ef66de8d7c50932.jpeg", // Nyan Cat
    "color": "white,white",
    "background": '#00000,#311ac5'
})

```

# Developer API

![Cover](https://raw.githubusercontent.com/formsend/nano/master/.github/developer.png)

### The Nano.to API is the easiest way to interact with the NANO blockchain. A CyberPunk UI/UX is an added bonus.

Accessed via GET or POST requests. You can use the browser to 'browse' the Blockchain. POST requests require something like [Postman](https://www.postman.com/) or a backend server. 

### Base URL


[https://api.nano.to](https://api.nano.to)


---

### Authentication

Nano.to API is free, and open to the world. The API is built to operate 24/7, 365 days per year, globally. 

To use the API you do **not** need an API key. 

Your IP Address is your API key. **Don't abuse it.**

---

### Rate Limiting

On most endpoints, you can expect to have 5 requests, per second. **This is plenty for most use cases.** Hitting the limit multiple times per day may result in longer lockouts or permanent ban.

If you need lots of simultaneous API calls, please let us know in advance. 

Email [Formsend](mailto:hello@forward.miami?subject=Nano.to&nbsp;Api&nbsp;Use), subject line 'Nano.to Api Use'. 

---

## GET: Live NANO Price

Get current NANO price in USD. The price refreshes every 60 seconds. CoinMarketCap is used for price data.

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

You can pass URL query parameters to change your request. 

**Bonus:** You can get other crypto prices.

**Params**

|  name |  type |  description
|---|---|---|
|   symbol | string |  Crypto symbol. **Default** NANO |
|   currency | string |  [ISO-4217](https://docs.1010data.com/1010dataReferenceManual/DataTypesAndFormats/currencyUnitCodes.html) symbol. **Default** USD |

Example: https://api.nano.to/price

Example 2: https://api.nano.to/price?symbol=ETH&currency=CYN

Example 3: https://api.nano.to/price?symbol=SHIB&currency=CAD

---

## GET: NANO Usernames

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

Balance information of any NANO address.

```bash
https://api.nano.to/account/[NANO_ADDRESS]
```

Response

```javascript
{
	"balance": "0.794048",
	"block_count": "248",
	"weight": "0",
	"pending": "0.02064",
	"balance_raw": "794048000000000000000000000000",
	"pending_raw": "20640000000000000000000000000",
	"usd_rate": "5.40",
	"usd_value": "4.29",
	"address": "nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o",
	"username": "moon"
}
```

**Params**

No additional params.

Demo: https://api.nano.to/account/moon

---

## GET: NANO Address Pending Blocks

Array of pending blocks (payments) for a NANO address.

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
		"amount_raw": "21120000000000000000000000000"
	},
	// {..}
]
```

**Params**

No additional params.

Demo: https://api.nano.to/pending/moon

---

## GET: NANO Block By Hash

```bash
https://api.nano.to/hash/[NANO_HASH]
```

Response

```javascript
{
	"type": "receive",
	"signature": "AEE7BAD417803EC1F761EB7173CE6E8AB78AE0DBA5F3BF7286D058742C1BBE1DB4CD80D4139095D061C9FEC1277AA7EBFB3AC9F4EF582A2CEF338B29727BF80B",
	"work": "694716ec03331b9e",
	"representative": "nano_3kqdiqmqiojr1aqqj51aq8bzz5jtwnkmhb38qwf3ppngo8uhhzkdkn7up7rp",
	"sender": "nano_3tu8f7jou49pt9u448ck81fc7r7gd6gsdutheewoxqhaibxcceiqegoefx4h",
	"pending": "0",
	"receiver": "nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o",
	"confirmed": "true",
	"timestamp": "2021-10-23T12:15:38.000Z"
}
```

**Params**

No additional params.

Demo: https://api.nano.to/hash/A341FBD3942B411D98BAC16241E5BC149DBE0D54D9BB23A873BC2A2C2B92B113

---

## GET: NANO Address History Blocks

Array of historical blocks (payments) of any NANO address. For now, API only goes back 50 blocks.  

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
		"height": "244",
		"hash": "94E74C2EDAE153C181858BD28CFB67BA990EC8D1C43427658A118C947121A995",
		"work": "610bb7829e958415",
		"signature": "E09B7AF936EE4CE248630F4D03407B5BB40E258FC06B841472A30FE4FF423962F5E2201BAB321B39C10C250169D8033EB1600D9D58E39B271B2B58CC7CDB9508",
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

Check if a NANO address has received a payment with a specific amount. **Searches Pending & History.** This is useful if you want to build your own payment checker.

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
	"height": "244",
	"hash": "94E74C2EDAE153C181858BD28CFB67BA990EC8D1C43427658A118C947121A995",
	"work": "610bb7829e958415",
	"signature": "E09B7AF936EE4CE248630F4D03407B5BB40E258FC06B841472A30FE4FF423962F5E2201BAB321B39C10C250169D8033EB1600D9D58E39B271B2B58CC7CDB9508",
	"balance_raw": "215288000000000000000000000000",
	"amount_raw": "21430000000000000000000000000"
}
```

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
