const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// app.get('/download/:fileName', (req, res) => {
//   const fileName = req.params.fileName;
//   const filePath = path.join(__dirname,  fileName);

//   // Simulate an error (e.g., the file doesn't exist)
//   if (!fs.existsSync(filePath)) {
//     const error = new Error('File not found');
//     error.status = 404;
//     throw error;
//   }

//   res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
//   res.setHeader('Content-type', 'application/octet-stream');

//   const fileStream = fs.createReadStream(filePath);

//   fileStream.on('error', (err) => {
//     console.error(err); // Log the error for debugging purposes
//     res.status(500).send('Internal Server Error: ' + err.message); // Send an error response to the client
//   });

//   fileStream.pipe(res);
//   fileStream.on('end', () => {
//     res.end();
//   });
// });




app.get('/download/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname,  fileName);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  // Set the appropriate headers for the download
  res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
  res.setHeader('Content-type', 'application/octet-stream');

  // Send the file as an attachment
  res.sendFile(filePath);
});

// app.get('/download/:fileName', (req, res) => {
//   const fileName = req.params.fileName;
//   const filePath = path.join(__dirname,  fileName);

//   // Check if the file exists
//   if (!fs.existsSync(filePath)) {
//     return res.status(404).send('File not found');
//   }

//   // Use res.download to trigger the file download
//   res.download(filePath, fileName, (err) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//     }
//   });
// });


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

