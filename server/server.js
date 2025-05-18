require('rootpath')();
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = ['http://localhost:4200', 'https://final-user-management.web.app'];
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
};

// Apply CORS middleware for all routes
app.use(cors(corsOptions));

// Handle OPTIONS requests explicitly
app.options('*', cors(corsOptions));

// api routes
app.use('/accounts', require('./accounts/accounts.controller'));
app.use('/departments', require('./departments'));
app.use('/employees', require('./employees'));
app.use('/workflows', require('./workflows'));
app.use('/requests', require('./requests'));

// swagger docs route
app.use('/api-docs', require('./helpers/swagger'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
}); 