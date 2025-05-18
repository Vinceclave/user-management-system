# User Management System - Server Deployment

This document provides instructions for deploying the User Management System backend server to a traditional hosting provider.

## Prerequisites

- Node.js 16+ installed on the server
- MySQL database server
- SSH access to your hosting server

## Deployment Steps

### 1. Transfer the Server Files

Transfer all files from the `server` directory to your hosting provider using SFTP or SCP:

```bash
scp -r ./server/* user@your-server:/path/to/deployment
```

### 2. Install Dependencies

Connect to your server via SSH and install the dependencies:

```bash
cd /path/to/deployment
npm install
```

### 3. Configure Environment Variables

Create a `.env` file on your server with the following content:

```
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
NODE_ENV=production
```

### 4. Setup Process Manager

Install PM2 to manage the Node.js process:

```bash
npm install -g pm2
```

Start the server with PM2:

```bash
pm2 start server.js --name "user-management-api"
```

Configure PM2 to start on system reboot:

```bash
pm2 startup
pm2 save
```

### 5. Configure Nginx (Recommended)

If using Nginx as a reverse proxy, add the following configuration:

```nginx
server {
    listen 80;
    server_name api.your-domain.com;
    
    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the configuration and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/user-management /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

### 6. SSL Certificate (Recommended)

Install Certbot and obtain an SSL certificate:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.your-domain.com
```

## Monitoring

Monitor your application with PM2:

```bash
pm2 status
pm2 logs user-management-api
```

## Troubleshooting

If the server fails to start:

1. Check the logs: `pm2 logs user-management-api`
2. Verify database connectivity
3. Check that all environment variables are correctly set
4. Ensure the port (default: 4000) is not in use by another application
