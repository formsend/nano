![Cover](https://raw.githubusercontent.com/formsend/nano/master/.github/banner.png)

# **[Nano.to](https://nano.to) is a free crypto payment checking API built for the NANO blockchain.** 

Use this API to create payment pages (like Stripe Checkout), Check for payments, and more. Accesible from any internet connected device with a modern web browser. Anonymous, no account or API key required to use.

Launched **September 15th, 2021**.  **We're still in Beta**. API is stable. More endpoints and complex operations are planned in the future. Enterprise planned for late 2022.

[NANO](https://nano.org) is a fee-less, decentralized crypto currency. **We did not built or own NANO.** We simply built a service on top of it. In the process, these public API endpoints were made available. 

**We can't wait to see what you build with it.**

### Live Demo: [nano.to/moon](https://nano.to/moon?title=Github%20Demo&success_url=https://media3.giphy.com/media/vCKC987OpQAco/giphy.gif&description=This%20is%20a%20live%20test.%20This%20NANO%20address%20is%20the%20nano.to%20official%20address.&success_url=https://media3.giphy.com/media/vCKC987OpQAco/giphy.gif&cancel_url=https://github.com/formsend/nano)

# Basic Usage

```sh
https://nano.to/[NANO_ADDRESS_OR_USERNAME]
```

Example:

```sh
https://nano.to/nano_3gf57qk4agze3ozwfhe8w6oap3jmdb4ofe9qo1ra3wcs5jc888rwyt61ymea
```

Example with a Username:

```sh
https://nano.to/Moon
```

Visit [https://nano.to](https://nano.to/) to reserve your Username.

## Customize

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


The same and more advanced params can be passed in the body of a POST request as so:

```
POST: https://nano.to/[NANO_ADDRESS_OR_USERNAME]
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
    "metadata": { "userId": 'joemama' }
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


**Note: While in Beta, API data structure may change, and user data is not being stored. Checkouts are stored in-memory and expire when successful, or after 4 hours, which ever comes first.**

### Check Short Name Status

You can check the status of any name by appending '?check=true' to the url. Even if you do not own it.

For example:

```
https://nano.to/moon?check=true
```

Gives us the following response

```
{
  "name": "moon",
  "status": "Active",
  "expires": "September 16, 2030 7:27 PM EST",
  "created": "September 15, 2021 7:27 PM EST"
}
```

### RAW Amount in QR Codes (Natrium Support)

The API currently supports the following URI schema:

```
nano:nano_3gf57qk4agze3ozwfhe8w6oap3jmdb4ofe9qo1ra3wcs5jc888rwyt61ymea?amount=1000
```

The amount is NOT in MEGA (not RAW). See this [issue](https://github.com/formsend/nano.to/issues/4) for more info.

To force RAW, you can pass an optional url param to force the API to generate RAW friendly QR Codes. 

```
https://nano.to/moon?natrium=true
```

```
https://nano.to/moon?title=Donate&price=10&natrium=true
```

---

# Advanced Usage (API)


### Base URL

```bash
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

You can pass URL query parameters to change your request. Our API supports passing a **symbol** param to change the Crypto and a **currency** param to change the FIAT currency. 

**Params**

|  name |  type |  description
|---|---|---|
|   symbol | string |  Crypto symbol. **Default** NANO |
|   currency | string |  [ISO-4217](https://docs.1010data.com/1010dataReferenceManual/DataTypesAndFormats/currencyUnitCodes.html) symbol. **Default** USD |

Demo: https://api.nano.to/price

Demo (Advanced): https://api.nano.to/price?symbol=ETH&currency=CYN

---

## GET: NANO Address Balance

Basic Blockchain information of any NANO address. Including balance.

```bash
https://api.nano.to/account/[NANO_ADDRESS]
```

Response

```javascript
{
	"balance": "0",
	"block_count": "213",
	"account_version": "2",
	"confirmation_height": "213",
	"representative": "nano_3kqdiqmqiojr1aqqj51aq8bzz5jtwnkmhb38qwf3ppngo8uhhzkdkn7up7rp",
	"weight": "0",
	"pending": "42166000000000000000000000000",
	"balance_raw": "0",
	"usd_rate": "5.33",
	"usd_value": "0.00"
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
		"link": "B9A32DE4243BEC0D7FC6BD86E12A8B06335A4556B0F7A83080F1591C54631B1C",
		"balance": "0",
		"previous": "AC0B2708ECDF215AC35C5E929AE769F8C3CBFFB6DC146C5372D3354EC0F4E0CB",
		"subtype": "send",
		"account": "nano_3gf57qk4agze3ozwfhe8w6oap3jmdb4ofe9qo1ra3wcs5jc888rwyt61ymea",
		"amount": "0.106144",
		"local_timestamp": "1633580511",
		"height": "213",
		"hash": "5B08707243334F86973D2FB99E1A7FC76EA2CD2E7EE4FB2FA3B2F09D8D3FBFFD",
		"work": "63368d538ef96743",
		"signature": "D0B7DC1AB23B972E7FB04A2BE169FB8DDDDD09F183AB7660EC3DDD0FA2BBBCE5B1BE7A33799BCF10F90C3C700973BADD877A241140716F26B3A2B57820321503",
		"timestamp": null,
		"balance_raw": "0",
		"amount_raw": "106144000000000000000000000000"
	},
	// {...}
]
```

**Params**

No additional params.

Demo: https://api.nano.to/history/moon

---

## GET: NANO Transaction By Amount

Check if a NANO address has received a payment with a specific amount. **Searches Pending & History.**. This is useful if you want to built your own payment checker. i.e **Nano.to**

```bash
https://api.nano.to/payment/[NANO_ADDRESS]/[AMOUNT]
```

```bash
https://api.nano.to/payment/nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o/0.02235
```

Amount must be in decimal (MEGA) not RAW.

Response

```javascript
{
	"type": "state",
	"representative": "nano_3zapp5z141qpjipsb1jnjdmk49jwqy58i6u6wnyrh6x7woajeyme85shxewt",
	"link": "B2C99D213874759E8CC34C3156E86BC58E38F37D9491977515A7E73FE591ECC5",
	"balance": "0.067071",
	"previous": "968DEFD7BC9551C74586B65BE012F0B31CDC66EAC999802872B3DFFA508D8692",
	"subtype": "receive",
	"account": "nano_3gf57qk4agze3ozwfhe8w6oap3jmdb4ofe9qo1ra3wcs5jc888rwyt61ymea",
	"amount": "0.02235",
	"local_timestamp": "1632343456",
	"height": "201",
	"hash": "10144EE93B2C6E60F3813F5667BDCC95C94D7C33237C6E80FA0209FC6EA4C18A",
	"work": "5ba5ff6ee5183292",
	"signature": "9408250F9FEEC2183384D2B14392AA3F0ED8868ABDF53FD266B66DED473118DBD4045789E52EFE3D9139666A179CDE55538DCC6F83FDC753ED6974264D9B5207",
	"timestamp": "1632343457208",
	"balance_raw": "67071000000000000000000000000",
	"amount_raw": "22350000000000000000000000000"
}
```

If no transaction is found, the response will be false.

**Params**

No additional params.
