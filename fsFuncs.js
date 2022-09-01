// Imports filesystem api 
const fs = require('fs');
// Imports readline for user prompts
const readline = require('readline');
const { stdin, stdout } = require('process');
const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

// Later use args[1] for path, and body for body.
const writeTo = (path, body) => {
  fs.writeFile(path, body, error => {
    if(error) { console.log( error )}; // logs error if there is one
  });
};

const readFrom = (path) => {
  fs.readFile(path, (error, data) => {
    if(error) { console.log(`${error}`)}; // logs error if there is one
    console.log(`Downloaded and saved ${data.length} bytes to ${path}`);
    process.exit();
  });
};

module.exports = {
rl,
writeTo,
readFrom,
};