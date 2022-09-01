// We will take arguments from the command line
const args = process.argv.slice(2);
console.log(args);
console.log(`--------------------------------------------------------------------------------`)
// Imports our request package
const request = require('request');
const {rl, writeTo, readFrom } = require('./fsFuncs');



// Requests HTTP from args[0]
request(args[0], (error, response, body) => {
  const localPath = args[1];
  console.log(`error: ${error}`); // logs error if there is one
  console.log(`statuscode: ${response && response.statusCode}`) // gives our status code

  // EC 1: if file path already exists => let user know, command prompt "Y -> enter" to overwrite 
  // otherwise skip & process.exit();

  // err... still reading as if there is already a file when there is none...
  if (localPath) {
    rl.question("The file path already exists.\nDo you want to overwrite it? (Y/N)", (ans) => {
      // case insensitive
      if(ans.toLowerCase() === "y") {
        console.log(`${ans} - Alright, overwriting...`);
        // Then, writes the body into the filename of localPath, and overwrites
        writeTo(localPath, body);
        // Reads the file when done to return total bytes, 1char = 1byte
        readFrom(localPath);
      } else {
        console.log(`${ans} - Stopping download... Exiting now.`);
        process.exit();
      }
    });
  } else if (!localPath) {
    writeTo(localPath, body);
    readFrom(localPath);
  }
});

