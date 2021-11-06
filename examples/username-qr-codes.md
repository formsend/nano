# QR Code API


**Note: This API endpoint is for Nano.to Usernames only. You must lease a [NANO Username](https://nano.to) before using these ednpoints.**


**Basic Usage**

Use this URL anywhere an HTML Image src goes. 

```
https://nano.to/Moon/QrCode
```

Pass more options with URL params.

```
https://nano.to/Moon/QrCode?image=200&amout=50
```

**HTML Link & Image Example**

```html
<a href="https://nano.to/Moon">
  <img style="max-width: 100px" src="https://nano.to/Moon/QrCode?image=100&amout=50"/>
</a>
```

<img style="max-width: 100px" src="https://nano.to/Moon/QrCode?image=100&amout=50"/>

**Natrium Deep Link & Image Example**

```
<a href="nano:nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o">
  <img style="max-width: 100px" src="https://nano.to/Moon/QrCode?image=300&amout=100"/>
</a>
```

**Autofill Amount**


```html
<img style="max-width: 100px" src="https://nano.to/Moon/qrcode?amount=0.3925&width=400"/>
```


### Markdown Examples


```markdown
![NANO Tip](https://nano.to/Moon/qrcode)
```

![Tip NANO](https://nano.to/Moon/QrCode?image=250&amout=50&icon=2)


### Customize Icons

```
https://nano.to/Moon/QrCode?image=250&amout=50&icon=3
```

```
<img style="max-width: 100px" src="https://nano.to/Moon/QrCode?image=250&amout=50&icon=3"/>
```

<img style="max-width: 100px" src="https://nano.to/Moon/QrCode?image=250&amout=50&icon=3"/>


