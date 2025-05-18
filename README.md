# User Management System

## Overview
This project is a user management system built with Angular for the frontend, Node.js + Express for the backend, and MySQL for the database. It provides functionalities for user registration, login, password reset, and profile management.

## Team
- **Igot, Vince Clave** - Backend Programmer
- **Cabusao, Ronin** - Frontend Programmer
- **Palacio, Real Jhon** - Frontend Programmer
- **Alino, Elijah Paul** - Tester

## Setup Instructions (setup in your command prompt(cmd) terminal)
1. **Clone the Repository**
   git clone <repository-url>
   cd user-management-system

2. **Install Dependencies**
   - **Frontend (Angular)**

     > cd client
     > npm install

## Deployment
This application can be deployed to Vercel. For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md).
     
   - **Backend (Node.js + Express)**
     > cd backend
     > npm install


3. **Database Setup**
   - Ensure MySQL is installed and running.
   - Create a database and update the connection string in the backend configuration.

4. **Run the Application**
   - **Frontend**
     > cd frontend
     > ng serve --open

   - **Backend**
     > cd backend
     > npm start

## Usage
- **User Registration**: Navigate to the registration page, enter valid user information, and submit the form.
- **User Login**: Go to the login page, input your registered email and password, and click login.
- **Password Reset**: Use the "Forgot Password" feature to reset your password.
- **Profile Management**: Update your profile information from the profile page.

## Test Cases

### Functional Testing Report

#### Test Case 1
Test Case ID: TC-FT-001

Test Scenario: User Registration

Test Steps:
1. Navigate to the registration page.
2. Enter valid user information.
3. Submit the registration form.

Prerequisites: Server running, database seeded.

Test Data:
- Email: youremail@example.com
- Password: Test@1234

Expected/Intended Results:  
The user receives a verification email and is redirected to the confirmation page.

Actual Results:  
Registration successful; verification email sent.

Test Status: Pass

#### Test Case 2
Test Case ID: TC-FT-002

Test Scenario: User Login

Test Steps:
1. Go to the login page.
2. Input registered email and correct password.
3. Click login.

Prerequisites: Email must be verified.

Test Data:
- Email: youremail@example.com
- Password: Test@1234

Expected/Intended Results:  
User is authenticated and redirected to the dashboard.

Actual Results:  
User successfully logged in and redirected.

Test Status: Pass

#### Test Case 3
Test Case ID: TC-FT-003

Test Scenario: Password Reset

Test Steps:
1. Navigate to the "Forgot Password" page.
2. Enter a registered email address.
3. Submit the password reset request.
4. Check the email inbox for a reset link.
5. Click the reset link and set a new password.

Prerequisites: Registered and verified user account.

Test Data:
- Email: youremail@example.com

Expected/Intended Results:  
User receives a password reset email, can set a new password, and is able to log in with the new password.

Actual Results:  
User received a password reset email, and is able to log in with the new password.

Test Status:  
Passed

### Security Testing Report

#### Test Case 1
Test Case ID: TC-ST-001

Test Scenario: SQL Injection on Login

Test Steps:
1. Go to login page.
2. Enter ' OR 1=1 -- as email and any password.
3. Submit login.

Prerequisites: Test database with real users.

Test Data:
- Email: ' OR 1=1 --
- Password: anything

Expected/Intended Results:  
Login should fail. System should not be vulnerable.

Actual Results:  
Login failed as expected; Email is invalid.

Test Status: Pass

#### Test Case 2
Test Case ID: TC-ST-002

Test Scenario: Cross-Site Scripting (XSS) on Profile Update

Test Steps:
1. Go to profile page.
2. Enter <script>alert('xss')</script> in the first name field.
3. Save changes.

Prerequisites: Logged in user session.

Test Data:
- First Name: <script>alert('xss')</script>

Expected/Intended Results:  
Script should not execute; input should be sanitized or encoded.

Actual Results:  
Input was saved and displayed as raw script. XSS vulnerability confirmed.

Test Status: Fail

#### Test Case 3
Test Case ID: TC-ST-003

Test Scenario: Session Fixation

Test Steps:
1. Log in with a valid user account.
2. Copy the session cookie.
3. Log out and log in as a different user.
4. Replace the new session cookie with the old one.

Prerequisites: Access to browser developer tools.

Test Data:  
- Session cookies from two different users.

Expected/Intended Results:  
System should invalidate old session cookies after logout; session fixation should not be possible.

Actual Results:  
The system did not invalidate the old session cookie, allowing the attacker to impersonate the first user.

Test Status: Fail


## License
This project is licensed under the MIT License - see the LICENSE file for details.