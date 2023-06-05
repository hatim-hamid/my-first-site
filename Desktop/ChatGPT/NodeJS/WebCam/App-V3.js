const http = require('http');
const fs = require('fs');
const path = require('path');

function serveFile(filename, res, contentType='text/plain', statusCode=200) {
  const filePath = path.join(__dirname, filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(statusCode, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

function serveWithFooter(res) {
  const indexPath = path.join(__dirname, 'index.html');
  fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      const footerPath = path.join(__dirname, 'footer.html');
      fs.readFile(footerPath, 'utf8', (err, footerData) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          const modifiedData = data.replace('<div id="footer-placeholder"></div>', footerData);
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(modifiedData);
        }
      });
    }
  });
}

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    serveWithFooter(res);
  } else if (req.url === '/index') {
    serveWithFooter(res);
  } else if (req.url === '/about') {
    serveFile('about.html', res, 'text/html');
  } else if (req.url === '/terms') {
    serveFile('MyCam.html', res, 'text/html');
  } else if (req.url === '/privacy') {
    serveFile('privacy.html', res, 'text/html');
  } else if (req.url === '/disclaimer') {
    serveFile('disclaimer.html', res, 'text/html');
  } else if (req.url === '/api') {
    serveFile('player_stats.json', res, 'application/json');
  } else if (req.url === '/footer') { 
    serveFile('footer.html', res, 'text/html');
  } else if (req.url === '/video'){

    if (req.url === '/video') {const videoPath = path.join(__dirname, 'test.mp4');
      const stat = fs.statSync(videoPath);
  
      res.writeHead(200, {'Content-Type': 'video/mp4', 'Content-Length': stat.size});
  
      const videoStream = fs.createReadStream(videoPath);
      videoStream.pipe(res);
    } 
  }  else {
    serveFile('404.html', res, 'text/html', 404);
   }
});

// Start the server on port 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

