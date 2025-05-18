# User Management System - Firebase Deployment

This project is set up to be deployed to Firebase using the "beansdeployment" branch.

## Deployed Application

- **Hosting URL**: https://final-user-management.web.app
- **API Backend**: See SERVER_DEPLOYMENT.md for details on deploying the backend API

## Firebase Project Information

- **Project Name**: Final User Management
- **Project ID**: final-user-management
- **Branch**: beansdeployment

## Deployment Instructions

### Prerequisites

1. Make sure you have Node.js and npm installed
2. Install Firebase CLI globally if not already installed:
   ```
   npm install -g firebase-tools
   ```
3. Log in to Firebase:
   ```
   firebase login
   ```
   firebase login
   ```

### Deployment Steps

1. Switch to the beansdeployment branch:
   ```
   git checkout beansdeployment
   ```

2. Install all dependencies:
   ```
   npm run install:all
   ```

3. Build the Angular application:
   ```
   npm run build:client
   ```

4. Deploy to Firebase Hosting (frontend only):
   ```
   firebase deploy --only hosting
   ```

### Database Configuration

The application is configured to use a production MySQL database with the following details:
- Host: 153.92.15.31
- Database: u875409848_igot
- User: u875409848_igot
- Password: 9T2Z5$3UKkgSYzE

### Backend Deployment

The backend API needs to be deployed to a traditional hosting provider as Firebase Functions requires a paid Blaze plan. See the `SERVER_DEPLOYMENT.md` file for detailed instructions on deploying the Node.js backend.

### Environment Variables

The following environment variables need to be set in your backend deployment:
- DB_HOST=153.92.15.31
- DB_PORT=3306
- DB_USER=u875409848_igot
- DB_PASSWORD=9T2Z5$3UKkgSYzE
- DB_NAME=u875409848_igot
- JWT_SECRET=mrbeans-secure-jwt-secret-key-2024
- EMAIL_FROM=mrbeans.dev@gmail.com
- SMTP_HOST=smtp.gmail.com
- SMTP_PORT=587
- SMTP_USER=mrbeans.dev@gmail.com
- SMTP_PASS=gezv stxl piar knuw
- NODE_ENV=production

## Frontend Configuration

The client application is configured to connect to your API at `https://igot.host/api`. If you deploy your backend to a different URL, update the API URL in the environment.prod.ts file:

```typescript
// client/src/environments/environment.prod.ts
export const environment = {
    production: true,
    apiUrl: 'https://igot.host/api', // Update this to your actual backend URL
    useFakeBackend: false
};
```

## Scripts

- `npm run install:all` - Install dependencies for both client and server
- `npm run build:client` - Build the Angular client application
- `npm run deploy` - Deploy both client and server to Firebase
- `npm run deploy:hosting` - Deploy only the client to Firebase Hosting
- `npm run deploy:functions` - Deploy only the server to Firebase Functions
