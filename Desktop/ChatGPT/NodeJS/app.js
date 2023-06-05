const http = require('http');
const fs = require('fs');
const path = require('path');

const name = 'Hatim';

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the content type to 'text/html'
 // res.setHeader('Content-Type', 'text/html');

  // Read the 'index.html' file
  const indexPath = path.join(__dirname, 'index.html');

  fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
      // Handle any error while reading the file
      res.statusCode = 500;
      res.end('Internal Server Error');
    } else {
      // Replace placeholder with the name
      const Data = data.replace('{{name}}', name);

      // Send the 'index.html' content as the response
      res.statusCode = 200;
      res.end(Data);
    }
  });
});

// Start the server on port 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});


 