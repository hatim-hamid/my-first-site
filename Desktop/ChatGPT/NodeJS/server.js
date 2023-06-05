const http = require('http');
const fs = require('fs');
const path = require('path');
const NodeWebcam = require('node-webcam');

// Configure webcam options
const webcamOptions = {
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  output: 'jpeg',
  callbackReturn: 'buffer',
};

// Create a webcam instance
const Webcam = NodeWebcam.create(webcamOptions);

function serveFile(filename, res, contentType = 'text/plain', statusCode = 200) {
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
    serveFile('terms.html', res, 'text/html');
  } else if (req.url === '/privacy') {
    serveFile('privacy.html', res, 'text/html');
  } else if (req.url === '/disclaimer') {
    serveFile('disclaimer.html', res, 'text/html');
  } else if (req.url === '/api') {
    serveFile('player_stats.json', res, 'application/json');
  } else if (req.url === '/footer') {
    serveFile('footer.html', res, 'text/html');
  } else if (req.url === '/video') {
    // Set content type to multipart/x-mixed-replace
    res.writeHead(200, { 'Content-Type': 'multipart/x-mixed-replace; boundary=frame' });

    // Continuously capture and stream frames from the webcam
    const frameInterval = setInterval(() => {
      // Capture a frame from the webcam
      Webcam.capture('frame', (err, buffer) => {
        if (err) {
          console.error('Error capturing frame:', err);
        } else {
          // Write frame boundary and content type to the response
          res.write('--frame\r\nContent-Type: image/jpeg\r\n\r\n');
          // Write the frame data to the response
          res.write(buffer, 'binary');
          // Add a new line after each frame
          res.write('\r\n');
        }
      });
    }, 1000 / 10); // Adjust the frame rate as needed (24 frames per second in this case)

    // End the response when the client closes the connection
    req.on('close', () => {
      clearInterval(frameInterval);
      res.end();
    });
  } else {
    serveFile('404.html', res, 'text/html', 404);
  }
});

// Start the server on port 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});





