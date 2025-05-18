/**
 * Firebase Functions implementation for User Management System API
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const path = require('path');
require('rootpath')();

// Import the Express app from the server directory
require('dotenv').config({ path: path.join(__dirname, '../server/.env') });

// Express app setup
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('../server/middleware/error-handler');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
   origin: ['http://localhost:4200', 'https://final-user-management.web.app'],
   credentials: true,
}));

// API routes
app.use('/accounts', require('../server/accounts/accounts.controller'));
app.use('/departments', require('../server/departments'));
app.use('/employees', require('../server/employees'));
app.use('/workflows', require('../server/workflows'));
app.use('/requests', require('../server/requests'));

// Swagger docs route
app.use('/api-docs', require('../server/helpers/swagger'));

// Global error handler
app.use(errorHandler);

// Export the API
exports.api = onRequest((request, response) => {
  logger.info(`API request received: ${request.method} ${request.path}`);
  return app(request, response);
});
