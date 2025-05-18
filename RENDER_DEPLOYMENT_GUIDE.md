# Deploying Your User Management System to Render.com

This guide provides detailed steps to deploy your Node.js API server to Render.com.

## Prerequisites

1. Create a [Render.com account](https://render.com/) if you don't already have one
2. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Create a New Web Service

1. Log in to your [Render Dashboard](https://dashboard.render.com/)
2. Click the **"New +"** button in the top-right corner
3. Select **"Web Service"** from the dropdown menu

![Create New Web Service](https://i.imgur.com/JXXSP7M.png)

### 2. Connect Your Repository

1. Connect your GitHub/GitLab account if you haven't already
2. Search for and select your repository
3. Click **"Connect"**

![Connect Repository](https://i.imgur.com/8uCwY7a.png)

### 3. Configure Your Web Service

1. Name: `user-management-api` (or your preferred name)
2. Root Directory: `/server` (important - this is where your Node.js code is)
3. Environment: `Node`
4. Region: Choose the region closest to your users
5. Branch: `main` (or your preferred branch)
6. Build Command: `npm install`
7. Start Command: `node server.js`
8. Plan: Select the plan that fits your needs (Free tier is available)

![Configure Web Service](https://i.imgur.com/ZpFJJ7D.png)

### 4. Add Environment Variables

Add the following environment variables by scrolling down to the "Environment Variables" section:

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

![Environment Variables](https://i.imgur.com/JQ5JNCE.png)

### 5. Deploy Your Service

1. Click **"Create Web Service"** at the bottom of the page
2. Render will start building and deploying your application
3. Wait for the deployment to complete (this can take a few minutes)

![Deployment Progress](https://i.imgur.com/VXvN3j7.png)

### 6. Verify Your Deployment

1. Once deployment is complete, Render will provide a URL for your service (e.g., `https://user-management-api.onrender.com`)
2. Test your API by accessing the API documentation at `https://your-render-url.onrender.com/api-docs`
3. Verify that your API endpoints are working correctly

### 7. Update Angular Client Configuration

1. Open your Angular client's environment.prod.ts file:
   ```typescript
   // client/src/environments/environment.prod.ts
   export const environment = {
       production: true,
       apiUrl: 'https://your-render-url.onrender.com', // Update with your actual Render URL
       useFakeBackend: false
   };
   ```

2. Replace `'https://your-render-url.onrender.com'` with your actual Render URL

### 8. Redeploy Your Angular Frontend

After updating the API URL, deploy your Angular client to Firebase:

```bash
# Build the Angular application
npm run build:client

# Deploy to Firebase Hosting
npm run deploy:hosting
```

## Troubleshooting

### Common Issues and Solutions

1. **API Connection Issues**: Verify that CORS is properly configured to allow requests from your Angular client's domain.

2. **Database Connection Errors**: Make sure your database server allows connections from Render.com's IP addresses. You might need to configure your database firewall.

3. **Environment Variables Issues**: Double-check that all environment variables are correctly set in the Render Dashboard.

4. **Deployment Failures**: Check the deployment logs for detailed error messages.

## Monitoring Your Deployment

1. **Logs**: View logs from the Render Dashboard to diagnose issues
2. **Performance**: Monitor the performance metrics in the Render Dashboard
3. **Auto-scaling**: Consider upgrading to a paid plan if you need better performance or scalability

![Render Dashboard Monitoring](https://i.imgur.com/6q8Uwvs.png)
