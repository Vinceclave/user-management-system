# Deploying to Vercel

This guide will help you deploy this User Management System to Vercel.

## Prerequisites

1. A Vercel account (sign up at vercel.com)
2. Vercel CLI installed: `npm install -g vercel`
3. A MySQL database service (like PlanetScale, AWS RDS, or any MySQL provider)

## Setup Steps

### 1. Configure Environment Variables in Vercel

Log in to your Vercel dashboard and create a new project. Then add the following environment variables:

- `NODE_ENV`: `production`
- `CLIENT_URL`: Your Vercel deployment URL (you can update this after the first deployment)
- `DB_HOST`: Your MySQL database host
- `DB_PORT`: Your MySQL database port (usually `3306`)
- `DB_USER`: Your MySQL database username
- `DB_PASSWORD`: Your MySQL database password
- `DB_NAME`: Your MySQL database name
- `JWT_SECRET`: A secure secret key for JWT generation
- `EMAIL_FROM`: Your email address for sending emails
- `SMTP_HOST`: Your SMTP host (e.g., `smtp.gmail.com`)
- `SMTP_PORT`: Your SMTP port (usually `587`)
- `SMTP_USER`: Your SMTP username
- `SMTP_PASS`: Your SMTP password

### 2. Deploy with Vercel CLI

Run the following commands from the project root:

```bash
# Login to Vercel
vercel login

# Deploy to Vercel
vercel

# Follow the prompts to configure your project
```

### 3. Update Client URL

After the first deployment, update the `CLIENT_URL` environment variable in your Vercel project settings with your actual deployment URL.

### 4. Configure Database

Make sure your MySQL database is accessible from Vercel's servers. You might need to:

- Allow remote connections from Vercel's IP range
- Create the necessary user with appropriate permissions

## Troubleshooting

- If you encounter CORS issues, check that your `CLIENT_URL` environment variable is correctly set.
- If database connection fails, verify that your database is accessible from Vercel and that your credentials are correct.
- Check Vercel logs for any deployment errors.

## Local Development

For local development:

```bash
# Install dependencies
npm install

# Run both client and server
npm run dev
```

The client will be available at http://localhost:4200 and the server at http://localhost:4000.
