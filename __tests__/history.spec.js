const Nano = require('../code/index');

jest.setTimeout(15000);

const nanoToAddress = "nano_1bc8gx518sp55o6nmxw8n9hh9uco8mig9suy79s4mo59dsr7uz84gbfkb7w1";

test('ensure Nano.to address hash valid', async () => {
    const response = await Nano.history(nanoToAddress)

    expect(response[0].hash).toBe("29891E93560EDD01F1637C23569D63C4968FFA0AC500D2E595269D55F3159F5E")
})
