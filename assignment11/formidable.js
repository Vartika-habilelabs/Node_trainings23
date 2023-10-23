const express = require("express");
const app = express();
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(
    '<form action="fileupload" method="POST" enctype="multipart/form-data">'
  );
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write("</form>");
  return res.end();
});

app.post("/fileupload", (req, res, next) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err;
    }
    const oldpath = files.filetoupload[0].filepath;
    const newpath = path.join(
      __dirname,
      "/uploads",
      files.filetoupload[0].originalFilename
    );
    fs.rename(oldpath, newpath, (err) => {
      if (err) throw err;
      res.write("File uploaded and moved!");
      res.end();
    });
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
