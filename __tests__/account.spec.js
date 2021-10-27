const Node = require('../code/index')

describe('user account', () => {
    jest.setTimeout(15000);

    const nanoToAddress = "nano_1bc8gx518sp55o6nmxw8n9hh9uco8mig9suy79s4mo59dsr7uz84gbfkb7w1";

    it('from nano.to returns balance', async () => {
        const account = await Node.account(nanoToAddress);

        expect(account.balance).toBe("0.001");
    });

    it('missing $NANO address returns error', async () => {
        const account = await Node.account();

        expect(account).toBeInstanceOf(Error);
    });
});
