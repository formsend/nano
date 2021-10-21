const Nano = require('./index.js')

const debug = true

function validate(name, value, type, output) {
	if (value && (typeof value).toLowerCase() == (type || 'string').toLowerCase()) {
		console.log( `${name}:`, '\x1b[32m', "Ok", '\x1b[0m')
	} else {
		console.log( `${name}:`, '\x1b[41m', "Error", '\x1b[0m')
	}
	if (debug && output) console.log(output)
}

;(async () => {

	var address = `nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o` // Nano.to
	var address2 = `nano_1xkyayfycettzcyhbexcmtqbhj5abbruq15urypzsnrby9s8nrhpj6fzxqcg` // Random Address

	console.clear()

	var startTime = Date.now();

	// Price from Nano.to, CoinMarketCap cached for 60 seconds.
	validate( "Nano.price()", await Nano.price(), 'number')

	// Price from CoinMarketCap
	// check( "Nano.price({ config })", (await api.price({ key: '{{ API_KEY }}' })).price, 'number')
	var account = await Nano.account(address) 
	validate( "Nano.account()", account.balance, 'string')

	var pending = await Nano.pending(address) 
	validate( "Nano.pending()", pending, 'object')

	var history = await Nano.history(address2) 
	validate( "Nano.address()", history, 'object')

	var rawAmount = '19424000000000000000000000000'
	var convertFromRaw =  Nano.fromRaw(rawAmount)
	validate( "Nano.fromRaw()", convertFromRaw, 'string')

	var convertToRaw =  Nano.toRaw(convertFromRaw)
	validate( "Nano.toRaw()", convertToRaw, 'string')

	var findBlockByAmount =  Nano.findBlockByAmount(address2, history[0].amount)
	validate( "Nano.findBlockByAmount()", findBlockByAmount, 'object')

	var elapsedTime = Date.now() - startTime;

	console.log("Finished in", `${elapsedTime}ms`)

})()