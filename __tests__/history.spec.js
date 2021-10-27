const Nano = require('../code/index');

const nanoToAddress = "nano_1bc8gx518sp55o6nmxw8n9hh9uco8mig9suy79s4mo59dsr7uz84gbfkb7w1";

// FIXME: Skip for now. Why is the hash either of these two?
//   29891E93560EDD01F1637C23569D63C4968FFA0AC500D2E595269D55F3159F5E
//   8EFC78FA0D6EAFEF3B5F34CCB53948442F4CF01054ED9C9A48617854D4C79352
//
xtest('ensure Nano.to address hash valid', async () => {
    const response = await Nano.history(nanoToAddress)

    expect(response[0].hash).toBe("29891E93560EDD01F1637C23569D63C4968FFA0AC500D2E595269D55F3159F5E")
})
