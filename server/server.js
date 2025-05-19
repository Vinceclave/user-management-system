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

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'https://user-management-system-atns.onrender.com',
    credentials: true
}));

// API routes
app.use('/accounts', require('./accounts/accounts.controller'));
app.use('/departments', require('./departments'));
app.use('/employees', require('./employees'));
app.use('/workflows', require('./workflows'));
app.use('/requests', require('./requests'));
app.use('/api-docs', require('./helpers/swagger'));

// Global error handler
app.use(errorHandler);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});