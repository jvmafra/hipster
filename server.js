// Get dependencies
import express from 'express';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import logger from 'morgan';
import {ScheduleService} from './server/service/ScheduleService';
import uuid from 'uuid/v1';

const cron = require('node-cron');
const api = require('./server/routes/api');
const publicacaoRouter = require('./server/routes/publicacaoRouter');
const reportRouter = require('./server/routes/reportRouter');
const confirmationRouter = require('./server/routes/confirmationRouter');
const cors = require('cors');

export const NAMESPACE = uuid();
export const domain = Boolean(process.env.PORT) ? 'http://hipstermusic.herokuapp.com' : 'http://localhost:4200';

// Get our API routes

const app = express();

app.use(logger('dev'));
app.use(cors());

// Parsers for POST data
app.use(bodyParser.json({
  limit: '30mb'
}));

// Point static path to dist
//app.use(express.static(path.join(__dirname, 'src')));

// Create link to Angular build directory
var distDir = __dirname + "/dist";
app.use(express.static(distDir));


// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
app.all('/api/v1/*', [require('./server/middleware/validateRequest')]);

// Set our api routes
app.use('/api', api);
app.use('/api/confirmation', confirmationRouter);
app.use('/api/v1/publicacao', publicacaoRouter);
app.use('/api/v1/report', reportRouter);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

ScheduleService.checkScheduler();

//Cron Schedule
cron.schedule('50 23 * * *', function(){
  ScheduleService.removeVideos();
});
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8080';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log(`API running on localhost:${port}`));
