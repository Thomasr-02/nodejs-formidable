const express = require('express');
const formidable = require('formidable');
//using repl for debugger in bash
const repl = require('repl');
//using for create hashs
const CryptoJS = require("crypto-js");
//using for find directory,filename
const path = require('path');
//using for manage files
const fs = require('fs').promises;

const PORT = 3000;

const app = express();

app.get('/health',(req,res)=>{
  res.send("Server running")
})

app.get('/',(req,res)=>{
  res.send(`
  <h2>With <code>"express"</code> npm package</h2>
  <form action="/upload" enctype="multipart/form-data" method="post">
    <div>Text field title: <input type="text" name="title" /></div>
    <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
    <input type="submit" value="Upload" />
  </form>
`)
})
// Using formidable for upload files
app.post('/upload', (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log("Uploaded")
    res.json({ fields, files });
  });
});

//using hash with library crypto-js
const crypto = ()=>{
  console.log("HmacSHA1");
  console.log(CryptoJS.HmacSHA1("Message", "Key"));
  console.log("SHA256");
  console.log(CryptoJS.SHA256("Message").words.toString('hex'));
}
const SECRET = 'Teste'

function enc(plainText){
    var b64 = CryptoJS.AES.encrypt(plainText, SECRET).toString();
    var e64 = CryptoJS.enc.Base64.parse(b64);
    var eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
}

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    console.log(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

app.listen(PORT,(req,res)=>{
  console.log("Server running on ", PORT)
  crypto()
  readFile(path.resolve(__dirname,'..', 'greetings.txt'));
  console.log(enc(SECRET));
})