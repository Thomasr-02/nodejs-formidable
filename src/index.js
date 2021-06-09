const express = require('express');
const formidable = require('formidable');

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


app.listen(PORT,(req,res)=>{
  console.log("Server running on ", PORT)
})