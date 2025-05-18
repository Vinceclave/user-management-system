# Deploying to Render.com

This document provides instructions for deploying the User Management System API to Render.com.

## Prerequisites

- A Render.com account
- Git repository with your code

## Deployment Steps

1. **Create a new Web Service on Render**:
   - Log in to your [Render Dashboard](https://dashboard.render.com/)
   - Click "New" > "Web Service"
   - Connect your GitHub/GitLab repository or upload your code
   - Select the `/server` directory as the root directory

2. **Configure your Web Service**:
   - **Name**: `user-management-api` (or your preferred name)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Select Free or paid plan based on your needs

3. **Environment Variables**:
   Set these environment variables in the Render Dashboard:
   ```
   NODE_ENV=production
   DB_HOST=153.92.15.31
   DB_PORT=3306
   DB_USER=u875409848_igot
   DB_PASSWORD=9T2Z5$3UKkgSYzE
   DB_NAME=u875409848_igot
   JWT_SECRET=mrbeans-secure-jwt-secret-key-2024
   EMAIL_FROM=mrbeans.dev@gmail.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=mrbeans.dev@gmail.com
   SMTP_PASS=gezv stxl piar knuw
   ```

4. **Deploy**:
   Click "Create Web Service" and wait for the deployment to complete.

5. **Update Client Configuration**:
   - Once deployed, Render will provide you with a URL for your API (e.g., `https://user-management-api.onrender.com`)
   - Update your Angular client's `environment.ts` and `environment.prod.ts` files with this URL

## Troubleshooting

- Check Render logs if you encounter any issues
- Ensure your database is accessible from Render's servers
- Verify that all environment variables are set correctly

## Notes

- The free tier of Render may have limitations and will spin down after periods of inactivity
- For production use, consider upgrading to a paid plan
