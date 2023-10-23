const https = require('https');
const fs = require('fs');
const WebSocket = require('websocket').server;

// Load SSL certificate and key for HTTPS
const privateKey = fs.readFileSync('privatekey.key', 'utf8');
const certificate = fs.readFileSync('certificate.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Create an HTTPS server
const httpsServer = https.createServer(credentials, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket Secure Server is running\n');
});

// Create a WebSocket server by attaching it to the HTTPS server
const wss = new WebSocket({
  httpServer: httpsServer,
});

// WebSocket server handling connections
wss.on('request', (request) => {
  const connection = request.accept(null, request.origin);

  // Handle incoming WebSocket messages
  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      console.log('Received message:', message.utf8Data);

      // Send a response message
      connection.sendUTF('Server received your message: ' + message.utf8Data);
    }
  });
  
  // setTimeout( ()=> {
	// 	// Close the WebSocket connection with a reason and additional data
	// 	const reasonCode = 1000; // Normal closure
	// 	const reasonText = 'Connection closed by server';
	// 	const data = 'Additional data to send';
	// 	connection.close(reasonCode, reasonText, data);
  // }, 5000)

  // Handle connection close
  connection.on('close', (reasonCode, description) => {
    console.log('Client disconnected:', reasonCode, description);
  });
});

// Start the HTTPS server on port 8080 (default for HTTPS)
httpsServer.listen(8080, () => {
  console.log('WSS server is listening on port 8080');
});
