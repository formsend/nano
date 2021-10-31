const fs = require("fs")

fs.readdir( __dirname + "/tests", function (err, files) {
    if (err) {
        console.log('Unable to scan directory: ' + err);
        return
    } 
    files.forEach(function (file) {
        try {
            require(`./tests/${file}`)
        } catch(e) { console.log(e) }
    });
});