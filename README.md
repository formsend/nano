![Cover](https://raw.githubusercontent.com/formsend/nano/master/.github/banner.png)

# nano.to

> Nano Crypto Currency Payment API & Short Link Service.

This service is a hosted payment API service for the NANO Crypto currency. It is in active development by the team at [Formsend](https://formsend.org). This Repo is for bug reports, pull requests, feature requests and general support. Long term vision is you running your own API 'node', for best security.

Live Demo: [nano.to/moon](https://nano.to/moon?title=Github%20Demo&success_url=https://media3.giphy.com/media/vCKC987OpQAco/giphy.gif&description=This%20is%20a%20live%20test.%20This%20NANO%20address%20is%20the%20nano.to%20official%20address.&success_url=https://media3.giphy.com/media/vCKC987OpQAco/giphy.gif&cancel_url=https://github.com/formsend/nano.to)

#### Checkout pages are free, and always will be. They are accesible from any internet connected device with a modern web browser. 

## Basic Usage

```sh
https://nano.to/[YOUR_NANO_ADDRESS]
```

```sh
https://nano.to/nano_3gf57qk4agze3ozwfhe8w6oap3jmdb4ofe9qo1ra3wcs5jc888rwyt61ymea
```

## Short Urls

```sh
https://nano.to/nano_3gf57qk4agze3ozwfhe8w6oap3jmdb4ofe9qo1ra3wcs5jc888rwyt61ymea
```

```sh
https://nano.to/henry --> https://nano.to/nano_3gf57q..
```

Visit [https://nano.to](https://nano.to/) to reserve names.

## Customize

```sh
GET: https://nano.to/[NANO_ADDRESS]?title=Donate&price=50
```

```sh
GET: https://nano.to/[NAME]?title=Donate&price=50
```

All options:

```bash
?title=Donate
&price=50
&description=<p>HTML allowed</p>
&suggest=Basic:30,Premium:50
&success_url=https://mywebsite.com/success?id={{id}}
&cancel_url=https://mywebsite.com/
&webhook_url=https://mywebsite.com/webhook
&webhook_secret=my-secret # don't use this in browser
```

The same and more advanced params can be passed in the body of a POST request as so:

```javascript
// npm install axios

axios.post('https://nano.to/[NANO_ADDRESS_OR_LEASED_NAME]', {
    "title": "Donate",
    "plans": [
        { "name": "Fries", "price": 5 },
        { "name": "Burger", "price": 10 }
    ],
    "business": {
        "name": "McDonalds",
        "logo": "https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg"
    },
    "success_url": "https://mywebsite.com/success?id={{id}}&anotherParam=hello",
    "cancel_url": "https://google.com"
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

You can check the entire data structure of a Checkout by appending '?json=true' to the 'url' in the POST response. 

```
https://api.nano.to/checkout/666ee7bf26a?json=true
```


**Note: While in Beta, data is subject to change and no user data is being permanetly stored. Checkouts are stored in-memory and expire when successful, or after 4 hours, which ever comes first.**

### Check Short Name Status

You can check the status of any name by appending '?whois=true' or '?check=true' to the url. Even if you do not own it.

For example:

```
https://nano.to/moon?whois=true
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

The amount is NOT in RAW. See this [issue](https://github.com/formsend/nano.to/issues/4) for more info.

For now, you can pass an optional url param to force the API to generate RAW friendly QR Codes. 

```
https://nano.to/moon?raw=true
```

## Rate Limiting

The entire API is rate limited to prevent abuse. If you need lots of simultaneous API calls, please let us know in advanced by emailing hello[at]forward.miami, subject line 'Api Use'. 


## 👤 Author

**Formsend.org**

* Github: [@formsend](https://github.com/formsend)
* Website: [https://formsend.org](https://formsend.org)

## 🤝 Contributing

Give a ⭐️ if this project helped you!

Contributions, issues and feature requests are welcome! Feel free to check [issues page](https://github.com/formsend/nano/issues).

## ♥️ Donate 

We accept Crypto donations at the following addresses:

Nano.to Link: [nano.to/moon](https://nano.to/moon?title=Donate&success_url=https://media3.giphy.com/media/vCKC987OpQAco/giphy.gif&description=This%20is%20a%20live%20test.%20This%20NANO%20address%20is%20the%20nano.to%20official%20address.)

```
# Nano
nano_3gf57qk4agze3ozwfhe8w6oap3jmdb4ofe9qo1ra3wcs5jc888rwyt61ymea

# Bitcoin
bc1qcgvew2a7ta3f7xy5999tdwyd8clrvdtpe2uvj5

# Doge
D9U1FLygkMydx3DE2sXgnuFpHm7ePm3Zwe

# Ethereum
0xdD4691Dc9562FB262e4b2076bE255303243f271d
```

## Stargazers

[![Stargazers over time](https://starchart.cc/formsend/nano.to.svg)](https://starchart.cc/formsend/nano.to)
