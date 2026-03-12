const fs = require('fs');

console.log("1");
// Non-Blocking...
fs.readFile('test.txt', 'utf-8', (err, result) => {
    console.log(result);
});

console.log("2");
console.log("3");
console.log("4");

const os = require("os");
console.log(os.cpus().length); //CPUs = Details of the cores {Array}