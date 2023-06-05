const http = require('http');
const fs = require('fs');
const path = require('path');

const name = 'Hatim';

// Create an HTTP server
const server = http.createServer((req, res) => {

  if (req.url === '/') {
    const aboutPath = path.join(__dirname, 'index.html');
    fs.readFile(aboutPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else if (req.url === '/about') {
    const aboutPath = path.join(__dirname, 'about.html');
    fs.readFile(aboutPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else if (req.url === '/api') {
    const playerStatPath = path.join(__dirname, 'player_stats.json');
    fs.readFile(playerStatPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
      }
    });
  } else if (req.url === '/terms') {
    const playerStatPath = path.join(__dirname, 'terms.html');
    fs.readFile(playerStatPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Page Not Found.');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});


 