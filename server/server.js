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

// Root route handler
app.get('/', (req, res) => {
    res.json({
        message: 'User Management System API',
        version: '1.0.0',
        endpoints: {
            accounts: '/accounts',
            departments: '/departments',
            employees: '/employees',
            workflows: '/workflows',
            requests: '/requests',
            docs: '/api-docs'
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// allow cors requests from any origin and with credentials
app.use(cors({
    origin: 'https://user-management-system-atns.onrender.com',
   credentials: true,
}));

// api routes
app.use('/accounts', require('./accounts/accounts.controller'));
app.use('/departments', require('./departments'));
app.use('/employees', require('./employees'));
app.use('/workflows', require('./workflows'));
app.use('/requests', require('./requests'));

// swagger docs route
app.use('/api-docs', require('./helpers/swagger'));

// Fallback route handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Not Found',
        message: 'The requested resource does not exist'
    });
});

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
}); 