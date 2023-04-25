const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const readline = require('readline');

try {
  // `who-to-greet` input defined in action metadata file
  const fileToRead = core.getInput('file');
  console.log(`FileToRead: ${fileToRead}`);
  
  const fileStream = fs.createReadStream(fileToRead);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const validFiles = [];
  const invalidFiles = [];
  const valid = new Boolean(false);

  for (const line of rl){
    console.log(`line: ${rl}`);
    if(rl.includes('-- liquibase-format')){
      valid = new Boolean(true);
    }
  }

  if(valid){
    validFiles.push(fileToRead);
  }else{
    invalidFiles.push(fileToRead);
  }
  core.setOutput("validFiles", validFiles);
  core.setOutput("invalidFiles", invalidFiles);
} catch (error) {
  core.setFailed(error.message);
}