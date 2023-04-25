# liquibase-file-validator

Reference Sources:
https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action

> NOTE: <i>If <b>NPM CERTIFICATE ERRORS</b>, execute:</i> <br/>
```npm config set strict-ssl false```

>GIT COMMANDS FOR TAG GENERATION
```
ncc build index.js --license licenses.txt
git add .
git commit -m "COMMIT COMMENT"
git tag -a -m "TAG DESCRIPTION" vx.y
git push --follow-tags
```
