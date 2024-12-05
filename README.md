# Web Application for User Authentication with Email/Password and Google OAuth

This web application allows users to create accounts using traditional email/password methods or by logging in with a pre-existing Google account via OAuth. Built using Node.js, the application leverages various technologies for authentication, session management, and data storage.

## Features
- **Email/Password Authentication:** Users can register and log in with their email and password.
- **Google OAuth Authentication:** Users can log in using their Google account for seamless authentication.
- **JWT Authentication:** JSON Web Tokens (JWTs) are used for securing user sessions.
- **User Profile Display:** Users' Google profile information is displayed after login.
- **Secure Password Storage:** Passwords are securely hashed using bcrypt.
- **Cookie-based Session Management:** Session cookies are managed using `cookie-session`.

## Technologies Used
- **Node.js:** Backend server running on Node.js.
- **Express:** Web framework for handling requests and routing.
- **MongoDB:** NoSQL database for storing user data.
- **Passport.js:** Middleware for authenticating requests using different strategies.
  - `passport-google-oauth20` strategy for Google authentication.
- **bcrypt:** Library for securely hashing passwords.
- **jsonwebtoken:** Used for generating and verifying JWT tokens.
- **cookie-session:** Manages user sessions with cookies.
- **Tailwind CSS:** A utility-first CSS framework for styling the frontend.

## Installation

### Prerequisites
- **Node.js:** Make sure you have Node.js installed on your system.
  - You can download it from [here](https://nodejs.org/).

### Step 1: Clone the repository
```bash
git clone https://github.com/aref-hammaslak/Authentication-and-OAuth.git
cd Authentication-and-OAuth
```

### Step 2: Install dependencies
Run the following command to install the necessary dependencies:
```bash
npm install
```

### Step 3: Environment Setup
- Create a `.env` file in the root of the project.
- Add your Google OAuth credentials:
  ```plaintext
  GOOGLE_CLIENT_ID=your_google_client_id
  GOOGLE_CLIENT_SECRET=your_google_client_secret
  COOKIE_KEY=your_cookie_secret_key
  JWT_SECRET=your_jwt_secret_key
  ```

### Step 4: Running the Application
To start the development server, run:
```bash
npm run dev
```
This will start the server on `http://localhost:3000`.

## Usage
- **Register/Sign up:** Users can create an account by providing their email and password.
- **Log in:** Users can log in using their email/password or with Google OAuth.
- **User Profile:** Upon logging in with Google, users' Google profile information will be displayed.
