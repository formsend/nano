const Nano = require('../code/index')

jest.setTimeout(15000)

describe('communication with exchange', () => {
    it('returns current rate of $NANO to $USD', async () => {
        const response = await Nano.price();

        expect(response).toBeGreaterThan(0);
    });
});
