# User Management System API

This is the backend API server for the User Management System. It provides API endpoints for user authentication, employee management, department management, workflow management, and request handling.

## Technologies Used

- Node.js
- Express.js
- MySQL with Sequelize ORM
- JWT Authentication
- Swagger for API documentation

## Getting Started

### Prerequisites

- Node.js 16+ installed
- MySQL database

### Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables by creating a `.env` file with the following variables or using the config.json:
   ```
   NODE_ENV=development
   DB_HOST=your-db-host
   DB_PORT=3306
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=your-db-name
   JWT_SECRET=your-jwt-secret
   EMAIL_FROM=your-email@example.com
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_USER=your-email@example.com
   SMTP_PASS=your-email-password
   ```

### Running the Server

```
npm start
```

The server will start on port 4000 by default in development mode.

## API Documentation

API documentation is available at `/api-docs` when the server is running.

## Deployment

This API server is designed to be deployed to Render.com. See the `RENDER_DEPLOYMENT.md` file for deployment instructions.
