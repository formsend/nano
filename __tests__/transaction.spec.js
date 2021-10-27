const Nano = require('../code/index')

describe('each nano transcations', () => {
    const nanoToAddres = "nano_1bc8gx518sp55o6nmxw8n9hh9uco8mig9suy79s4mo59dsr7uz84gbfkb7w1";
    const nanoAmount = "0.001";
    const nanoTxHash = "8EFC78FA0D6EAFEF3B5F34CCB53948442F4CF01054ED9C9A48617854D4C79352"

    it('find block by amount', async () => {
        const response = await Nano.findBlockByAmount(nanoToAddres, nanoAmount);

        expect(response.type).toBe("pending");
        expect(response.amount).toBe(nanoAmount);
        expect(response.hash).toBe(nanoTxHash);
    });

    it('is in pending session', async () => {
        const response = await Nano.pending(nanoToAddres)

        expect(response[0].hash).toBe(nanoTxHash)
    })
});
