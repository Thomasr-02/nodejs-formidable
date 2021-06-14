const express = require("express");
//using formidable for upload files
const formidable = require("formidable");
//using repl for debugger in bash
const repl = require("repl");
//using crypto-js for create hashs
const CryptoJS = require("crypto-js");
//using path for find directory,filename etc
const path = require("path");
//using fs for manage files
const fs = require("fs").promises;

const PORT = 3000;
const SECRET = "Teste";
const CURRENT_DIR = path.resolve(__dirname, "..");
const FILE_GREETINGS = path.resolve(__dirname, "..", "greetings.txt");
const PARAMETERS_QUANTITY = 1;

const app = express();

app.get("/health", (req, res) => {
  res.send("Server running");
});

app.get("/", (req, res) => {
  res.send(`
  <h2>With <code>"express"</code> npm package</h2>
  <form action="/upload" enctype="multipart/form-data" method="post">
    <div>Text field title: <input type="text" name="title" /></div>
    <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
    <input type="submit" value="Upload" />
  </form>
`);
});

app.post("/upload", (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log("Uploaded");
    res.json({ fields, files });
  });
});

const crypto = () => {
  console.log("HmacSHA1");
  console.log(CryptoJS.HmacSHA1("Message", "Key"));
  console.log("SHA256");
  console.log(CryptoJS.SHA256("Message").words.toString("hex"));
};

const enc = () => {
  const b64 = CryptoJS.AES.encrypt(SECRET, SECRET).toString();
  const e64 = CryptoJS.enc.Base64.parse(b64);
  const eHex = e64.toString(CryptoJS.enc.Hex);
  return eHex;
};

const readFile = async () => {
  try {
    const data = await fs.readFile(FILE_GREETINGS);
    console.log(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
};

const readDir = async () => {
  try {
    const filesOnDirectory = await fs.readdir(CURRENT_DIR);
    console.log(filesOnDirectory);
  } catch (error) {
    console.log(error);
  }
};

const copieFiles = async () => {
  const random_name = "./tmp/"+ Math.random().toString(36).substring(7) + ".txt";
  fs.copyFile(FILE_GREETINGS, random_name, PARAMETERS_QUANTITY, (error) => {
    if (error) {
      console.log(error);
    }
  });
};

const createDir = async (newDir) =>{
  const existDir = 1;
  const findDir = (await fs.readdir(CURRENT_DIR)).filter(dir => dir===newDir);
  if(findDir.length === existDir){
    console.log("already exist directory:", newDir);
    return;
  }
  await fs.mkdir(newDir);
}

app.listen(PORT, (req, res) => {
  console.log("Server running on ", PORT);
  console.log("\n----------------------------------------");
  console.log("Learning more about CRYPTO-JS\n");
  crypto();
  console.log(enc());
  console.log("\n----------------------------------------");
  console.log("Learning more about FS\n");
  readFile();
  readDir();
  createDir("tmp");
  copieFiles();
});
