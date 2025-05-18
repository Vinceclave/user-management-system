const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error-handler');
const swagger = require('./helpers/swagger');

// Create Express app
const app = express();

// Add middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: true })); // Enable CORS for all origins

// Setup Swagger docs
swagger.setup(app);

// API routes
app.use('/accounts', require('./accounts/accounts.controller'));
app.use('/admin/accounts', require('./admin/accounts/accounts.controller'));
app.use('/profile', require('./accounts/profile.controller'));
app.use('/dashboard', require('./accounts/dashboard.controller'));
app.use('/departments', require('./departments'));
app.use('/employees', require('./employees'));
app.use('/requests', require('./requests'));
app.use('/workflows', require('./workflows'));

// Global error handler
app.use(errorHandler);

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});