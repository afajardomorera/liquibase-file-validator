const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const readline = require('readline');

try {
  // `who-to-greet` input defined in action metadata file
  const fileToRead = core.getInput('file');
  console.log(`FileToRead: ${fileToRead}`);
  
  const nReadlines = require('n-readlines');
  const broadbandLines = new nReadlines(fileToRead);

  let line;
  let lineNumber = 1;
  let cont = 0;
  const valid = new Boolean(false);

  while (line = broadbandLines.next() && lineNumber < 11) {
    console.log(`Line ${lineNumber} has: ${line.toString('utf-8')}`);
    if(line.toString().includes('--liquibase-format')){
      console.log("ENTRA FORMAT");
      cont++;
    }
    if(line.toString().includes('--changeset')){
      console.log("ENTRA CHANGESET");
      cont++;
    }
    lineNumber++;
  }

  if(cont == 2){
    console.log("VALIDO");
    valid = new Boolean(true);
  }
  const validFiles = [];
  const invalidFiles = [];
  
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