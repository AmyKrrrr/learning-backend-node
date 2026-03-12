const fs = require('fs');

// --WRITE FILE--
// Sync...
// fs.writeFileSync('./test.txt', 'Hey World');

// A-sync...
// fs.writeFile("./test.txt", "Hello World Async", (err) => {});

//-----------------------------------------------//
// --READ FILE--
//Sync
// const result_sync = fs.readFileSync('./test.txt', 'utf-8');

//Async
// const result = fs.readFile('./test.txt', 'utf-8', (err, result) => {
    //     if(err)
    //         console.log("ERROR", err);
//     else
    //         console.log(result);
// });

// console.log(result);

// sync wala result return kar deta hai.
// async wala kuchh return nahi karta. It expects a callback.

//-----------------------------------------------//

// fs.appendFileSync('./test.txt', `${Date.now()} Hey There\n`);

//-----------------------------------------------//

// fs.cpSync('./test.txt', "./copy.txt");

//-----------------------------------------------//

// fs.unlinkSync("./copy.txt"); // delete

//-----------------------------------------------//

console.log(fs.statSync('./test.txt'));
fs.mkdirSync("my-docs/a/b", {recursive: true});