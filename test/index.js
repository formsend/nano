"use strict";

global.good = function echo(name) {
    console.log(`${name}:`, '\x1b[32m', "Ok", '\x1b[0m')
}

global.bad = function echo(name) {
    console.log(`${name}:`, '\x1b[41m', "Error", '\x1b[0m')
}

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