require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middleware/error-handler');

// Load environment variables if running in production
if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({
   origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : 'http://localhost:4200',
   credentials: true,
}));

// api routes
app.use('/api/accounts', require('./accounts/accounts.controller'));
app.use('/api/departments', require('./departments'));
app.use('/api/employees', require('./employees'));
app.use('/api/workflows', require('./workflows'));
app.use('/api/requests', require('./requests'));

// swagger docs route
app.use('/api/api-docs', require('./helpers/swagger'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

// Check if we're running in Vercel or traditional environment
if (process.env.VERCEL) {
  // Export for serverless use
  module.exports = app;
} else {
  // Start server for traditional deployment
  app.listen(port, () => {
      console.log('Server listening on port ' + port);
  });
}