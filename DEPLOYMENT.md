# User Management System - Deployment Architecture

This project uses a split deployment strategy:

## Frontend
- **Angular application** hosted on Firebase Hosting
- Deployed at: https://final-user-management.web.app
- Deployment command: `npm run deploy:hosting` or `firebase deploy --only hosting`

## Backend
- **Node.js/Express API** hosted on Render.com
- See [SERVER_DEPLOYMENT.md](SERVER_DEPLOYMENT.md) for detailed instructions on deploying the server to Render.com

## Configuration

After deploying the backend to Render.com, update the API URL in:
```
client/src/environments/environment.prod.ts
```

Then redeploy the frontend to Firebase Hosting.

## Important Notes

1. Firebase Functions has been removed from this project
2. The `functions` directory is no longer used
3. CORS is configured in the server to allow requests from:
   - http://localhost:4200 (development)
   - https://final-user-management.web.app (production)
