const http = require('http');
const path = require('path');
const fs = require('fs');
const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: path.join(__dirname, 'media'),
    allow_origin: '*',
    hls: {
      hls_path: path.join(__dirname, 'media', 'hls'),
      hls_fragment: 10,
      hls_playlist_length: 60
    }
  }
};

const nms = new NodeMediaServer(config);
nms.run();

console.log('Live streaming server is running...');

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.url === '/video') {
    const videoPath = path.join(__dirname, 'media', 'video.mp4');

    // Check if the file exists
    fs.stat(videoPath, (err, stat) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Video Not Found');
      } else {
        res.writeHead(200, {
          'Content-Type': 'video/mp4',
          'Content-Length': stat.size
        });

        const videoStream = fs.createReadStream(videoPath);
        videoStream.pipe(res);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page Not Found');
  }
});

// Start the server on port 8000
const port = 8080;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

