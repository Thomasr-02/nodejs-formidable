## A simple project for learn more about librarys and configs - NodeJS
* formidable
* repl
* .npmrc, .nvmrc
* crypto-js

##### How run ?
  ```  yarn & yarn start```
  for install dependencies and running script defined in package.json

### NodeJS

Node.js is open-source, cross-platform software based on Google's V8 interpreter that allows JavaScript code to run outside of a web browser.

---

#### Formidable

A Node.js module for parsing form data, especially file uploads.

---

#### RPEL

The repl module provides a Read-Eval-Print-Loop (REPL) implementation that is available both as a standalone program or includible in other applications.

---

#### .nvmrc x .npmrc

**nvmrc** is a config file for nvm(node-version-manager) we can set specify node versions in project 

- This project, I defined in package.json:
```json
 "engines": {
    "node": ">17.1.0"
  },
```
  I am saying this project can running versions greater than 17.1.0 

- I create file `.nvmrc` and set in `v17.1.0`, when execute `nvm use` project change version for defined in file. But We can automat this process
Add this, at end line of your shell (bashrc, zshrc), 
  ```shell
  # place this after nvm initialization!
  autoload -U add-zsh-hook
  load-nvmrc() {
    local node_version="$(nvm version)"
    local nvmrc_path="$(nvm_find_nvmrc)"

    if [ -n "$nvmrc_path" ]; then
      local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

      if [ "$nvmrc_node_version" = "N/A" ]; then
        nvm install
      elif [ "$nvmrc_node_version" != "$node_version" ]; then
        nvm use
      fi
    elif [ "$node_version" != "$(nvm version default)" ]; then
      echo "Reverting to nvm default version"
      nvm use default
    fi
  }
  add-zsh-hook chpwd load-nvmrc
  load-nvmrc
  ```


**npmrc** is a config file for (node-package-manager) we can set specify config for your project such as registry, engine-strict and more.

- you can see more in [npmrc](https://docs.npmjs.com/cli/v7/configuring-npm/npmrc)

---

#### Crypto-js

JavaScript library of crypto standards.

