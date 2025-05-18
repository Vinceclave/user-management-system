require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({
   origin: function(origin, callback) {
      const allowedOrigins = [
         'http://localhost:4200',
         'https://4200-firebase-user-management-system-1747543700327.cluster-sumfw3zmzzhzkx4mpvz3ogth4y.cloudworkstations.dev',
         'https://9000-firebase-user-management-system-1747543700327.cluster-sumfw3zmzzhzkx4mpvz3ogth4y.cloudworkstations.dev',
         'https://firebase-user-management-system-1747543700327.cluster-sumfw3zmzzhzkx4mpvz3ogth4y.cloudworkstations.dev'
      ];
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
         console.log('Blocked origin:', origin);
         return callback(null, true); // Allow all origins in development
      }
      return callback(null, true);
   },
   credentials: true,
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
   exposedHeaders: ['Set-Cookie'],
}));

// api routes
app.use('/api/accounts', require('./accounts/accounts.controller'));
app.use('/api/departments', require('./departments'));
app.use('/api/employees', require('./employees'));
app.use('/api/workflows', require('./workflows'));
app.use('/api/requests', require('./requests'));

// swagger docs route
app.use('/api-docs', require('./helpers/swagger'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});