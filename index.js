const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const readline = require('readline');
const nReadlines = require('n-readlines');

try {
  // `who-to-greet` input defined in action metadata file
  const fileToRead = core.getInput('file');
  console.log(`FileToRead: ${fileToRead}`);
  
  if (fs.existsSync(fileToRead)) {
    console.log("EXISTE");
    const broadbandLines = new nReadlines(fileToRead);

    let line;
    let lineNumber = 1;
    let cont = 0;
    const valid = new Boolean(false);

    while (line = broadbandLines.next() && lineNumber < 11) {
      console.log(`Line ${lineNumber} has: ${line.toString('ascii')}`);
      if(line.toString().includes('--liquibase-format')){
        console.log("ENTRA FORMAT");
        cont++;
      }
      if(line.toString().includes('--changeset')){
        console.log("ENTRA CHANGESET");
        cont++;
      }
      console.log("SIGUIENTE LINEA");
      lineNumber++;
    }
    
    console.log(`CONTADOR1: ${cont}`);
    if(cont == 2){
      console.log("SE PONE VALID A TRUE");
      valid = new Boolean(true);
    }else{
      console.log(`CONTADOR2: ${cont}`);
    }
    const validFiles = [];
    const invalidFiles = [];
    
    if(valid){
      console.log(`VALIDO`);
      validFiles.push(fileToRead);
    }else{
      console.log(`NO VALIDO`);
      invalidFiles.push(fileToRead);
    }
    core.setOutput("validFiles", validFiles);
    core.setOutput("invalidFiles", invalidFiles);
  }else{
    console.log("NO EXISTE");
  }

} catch (error) {
  core.setFailed(error.message);
}