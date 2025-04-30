# user-management-system
 angular setup pairing with node + express and MySQL (boilerplate API)
Team:
 Igot, Vince Clave - Backend Programmer
 Cabusao, Ronin - Frontend Programmer
 Palacio, Real Jhon - Frontend Programmer
 Alino, Elijah Paul - Tester
 Functional Testing Report 

 Test Case 1
Test Case ID: TC-FT-001

Test Scenario: User Registration

Test Steps:

Navigate to the registration page.

Enter valid user information.

Submit the registration form.

Prerequisites: Server running, database seeded.

Test Data:

Email: user1@example.com

Password: Test@1234

Expected/Intended Results:
The user receives a verification email and is redirected to the confirmation page.

Actual Results:
Registration successful; verification email sent.

Test Status: Pass

Test Case 2
Test Case ID: TC-FT-002

Test Scenario: User Login

Test Steps:

Go to the login page.

Input registered email and correct password.

Click login.

Prerequisites: Email must be verified.

Test Data:

Email: user1@example.com

Password: Test@1234

Expected/Intended Results:
User is authenticated and redirected to the dashboard.

Actual Results:
User successfully logged in and redirected.

Test Status: Pass

Security Testing Report (Tester 2)
Test Case 1
Test Case ID: TC-ST-001

Test Scenario: SQL Injection on Login

Test Steps:

Go to login page.

Enter ' OR 1=1 -- as email and any password.

Submit login.

Prerequisites: Test database with real users.

Test Data:

Email: ' OR 1=1 --

Password: anything

Expected/Intended Results:
Login should fail. System should not be vulnerable.

Actual Results:
Login failed as expected; Email is invalid

Test Status: Pass

Test Case 2
Test Case ID: TC-ST-002

Test Scenario: Cross-Site Scripting (XSS) on Profile Update

Test Steps:

Go to profile page.

Enter <script>alert('xss')</script> in the first name field.

Save changes.

Prerequisites: Logged in user session.

Test Data:

First Name: <script>alert('xss')</script>

Expected/Intended Results:
Script should not execute; input should be sanitized or encoded.

Actual Results:
Input was saved and displayed as raw script. XSS vulnerability confirmed.

Test Status: Fail