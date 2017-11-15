// Get dependencies
import express from 'express';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
const api = require('./server/routes/api');



// Get our API routes


const app = express();

// Parsers for POST data
app.use(bodyParser.json({
  limit: '30mb'
}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'src')));

// Set our api routes
app.use('/api', api);


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log(`API running on localhost:${port}`));


