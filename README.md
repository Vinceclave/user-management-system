# User Management System - Split Deployment Architecture

This project uses a split deployment architecture:
- **Frontend**: Angular application hosted on Firebase Hosting
- **Backend**: Node.js API server hosted on Render.com

## Deployed Applications

- **Frontend URL**: https://final-user-management.web.app
- **API Backend**: https://your-render-deployment-url.onrender.com (Deployed on Render.com)

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

### Deployment Steps

#### Frontend Deployment

1. Install all dependencies:
   ```
   npm run install:all
   ```

2. Build the Angular application:
   ```
   npm run build:client
   ```

3. Deploy to Firebase Hosting:
   ```
   npm run deploy:hosting
   ```
   or
   ```
   firebase deploy --only hosting
   ```

#### Backend Deployment

See [SERVER_DEPLOYMENT.md](SERVER_DEPLOYMENT.md) for detailed instructions on deploying the Node.js backend to Render.com.

## Backend Configuration

The backend configuration details including database settings and environment variables are specified in [SERVER_DEPLOYMENT.md](SERVER_DEPLOYMENT.md).

## API Configuration

The client application is configured to connect to your API at `https://igot.host/api`. When you deploy your backend to Render.com, update the API URL in the environment.prod.ts file:

```typescript
// client/src/environments/environment.prod.ts
export const environment = {
    production: true,
    apiUrl: 'https://your-render-api-url.onrender.com', // Update this to your actual Render.com URL
    useFakeBackend: false
};
```

## Scripts

- `npm run install:all` - Install dependencies for both client and server
- `npm run build:client` - Build the Angular client application
- `npm run deploy` - Deploy the client to Firebase Hosting
- `npm run deploy:hosting` - Deploy the client to Firebase Hosting
