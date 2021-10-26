const fs = require("fs")

console.clear()

fs.readdir("./tests", function (err, files) {
    if (err) {
        console.log('Unable to scan directory: ' + err);
        return
    } 
    files.forEach(function (file) {
        require(`./tests/${file}`)
    });
});