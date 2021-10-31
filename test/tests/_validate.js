module.exports = (name, value, type, output) => {
	if (value && value.message) return console.error(value)
	if (value && (typeof value).toLowerCase() == (type || 'string').toLowerCase()) {
		console.log( `${name}:`, '\x1b[32m', "Ok", '\x1b[0m')
	} else {
		console.log( `${name}:`, '\x1b[41m', "Error", '\x1b[0m')
	}
	if (output) console.log(output)
}