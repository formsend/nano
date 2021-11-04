# NPM Module

Work in progress.

### Available Methods

```
{
  url: 'https://nano.to',
  toRaw: [Function: toRaw],
  fromRaw: [Function: fromRaw],
  price: [AsyncFunction: price],
  account: [AsyncFunction: account],
  address: [AsyncFunction: account],
  pending: [AsyncFunction: pending],
  history: [AsyncFunction: history],
  checkout: { get: [AsyncFunction: get], create: [AsyncFunction: create] },
  name: [AsyncFunction: name],
  username: [AsyncFunction: name],
  qr: [AsyncFunction: qrCode],
  qrcode: [AsyncFunction: qrCode],
  QrCode: [AsyncFunction: qrCode],
  qrCode: [AsyncFunction: qrCode],
  order: { get: [AsyncFunction: get], create: [AsyncFunction: create] },
  invoice: { get: [AsyncFunction: get], create: [AsyncFunction: create] },
  purchase: { get: [AsyncFunction: get], create: [AsyncFunction: create] }
  payment: [AsyncFunction: findBlockByAmount],
  blockchain: {
      findBlockByAmount: [AsyncFunction: findBlockByAmount],
      units: {
          hex: 'hex',
          raw: 'raw',
          nano: 'nano',
          knano: 'knano',
          Nano: 'Nano',
          NANO: 'NANO',
          KNano: 'KNano',
          MNano: 'MNano'
      },
      checkAddress: [Function: D],
      checkAmount: [Function: S],
      checkHash: [Function: y],
      checkIndex: [Function: G],
      checkKey: [Function: d],
      checkSeed: [Function: U],
      checkSignature: [Function: p],
      checkThreshold: [Function: F],
      checkWork: [Function: k],
      computeWork: [Function],
      convert: [Function: EA],
      createBlock: [Function],
      deriveAddress: [Function: QA],
      derivePublicKey: [Function: aA],
      deriveSecretKey: [Function],
      generateSeed: [Function],
      hashBlock: [Function],
      signBlock: [Function: uA],
      validateWork: [Function],
      verifyBlock: [Function]
  },
}
```