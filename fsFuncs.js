// Imports filesystem api 
const fs = require('fs');
// Imports readline for user prompts
const readline = require('readline');
const { stdin, stdout } = require('process');
const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});