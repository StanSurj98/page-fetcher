// We will take arguments from the command line
const args = process.argv.slice(2);
console.log(args);
console.log(`--------------------------------------------------------------------------------`)

// Imports filesystem api 
const fs = require('fs');
// Imports our request package
const request = require('request');
// Imports readline for user prompts
const readline = require('readline');
const { stdin, stdout } = require('process');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


// Testing out fs.writeFile => writes our file to something called index.html, creates it if not present
// const content = "hello"
// fs.writeFile('./index.html', content, error => {
//   if (error) {
//     console.log(error);
//   } 
// });

// Requests HTTP from args[0]
request(args[0], (error, response, body) => {
  console.log(`error: ${error}`); // logs error if there is one
  console.log(`statuscode: ${response && response.statusCode}`) // gives our status code

  
  
  // EC 1: if file path already exists => let user know, command prompt "Y -> enter" to overwrite
  // otherwise skip & process.exit();
  if (args[1]) {
    rl.question("The file path already exists.\nDo you want to overwrite it? (Y/N)", (ans) => {
      // case insensitive
      if(ans.toLowerCase() === "y") {
        console.log(`${ans} - Alright, overwriting...`);
        // Then, writes the body into the filename of args[1], and overwrites
        fs.writeFile(args[1], body, error => {
          if(error) { console.log( error )}; // logs error if there is one
        });
        // Reads the file when done to return total bytes, 1char = 1byte
        fs.readFile(args[1], (error, data) => {
          if(error) { console.log(`${error}`)}; // logs error if there is one
          console.log(`Downloaded and saved ${data.length} bytes to ${args[1]}`);
          process.exit();
        });
        
      } else {
        console.log(`${ans} - Stopping download... Exiting now.`);
        process.exit();
      }
      
    });
  } else if (!args[1]) {

    fs.writeFile(args[1], body, error => {
      if(error) { console.log( error )}; // logs error if there is one
    });

    fs.readFile(args[1], (error, data) => {
      if(error) { console.log(`${error}`)}; // logs error if there is one
      console.log(`Downloaded and saved ${data.length} bytes to ${args[1]}`);
      process.exit();
    });
  }
});

