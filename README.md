![Cover](https://raw.githubusercontent.com/formsend/nano/master/.github/banner.png)

# nano.to

> Nano Crypto Currency Payment API & Short Link Service.

#### This service is a hosted payment gateway for the NANO Crypto currency. It is in active development by the team at [Formsend](https://formsend.org). This Repo is for bug reports, pull requests and feature requests and general support. No date yet on us Open Sourcing the API code, but definitely on the horizon.

### Live Demo: [nano.to/demo](https://nano.to/moon?title=Github%20Demo&success_url=https://media3.giphy.com/media/vCKC987OpQAco/giphy.gif&description=This%20is%20a%20live%20test.%20This%20NANO%20address%20is%20the%20nano.to%20official%20address.&success_url=https://media3.giphy.com/media/vCKC987OpQAco/giphy.gif&cancel_url=https://github.com/formsend/nano.to)

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
https://nano.to/[NANO_ADDRESS]?title=Donate&price=50
```

```sh
https://nano.to/[NAME]?title=Donate&price=50
```

All options:

```bash
?title=Donate
&price=50
&description=50
&suggest=Basic:30,Premium:50
&success_url=https://mywebsite.com/success?id={{id}}
&cancel_url=https://mywebsite.com/
&webhook_url=https://mywebsite.com/webhook
&webhook_secret=my-secret # don't use this in browser
```

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

## Rate Limiting

Our entire API is rate limited to prevent abuse. If you need lots of simultaneous API calls, please let us know in advanced by emailing us at hello[at]forward.miami. 

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
