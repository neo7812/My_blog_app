#  My_Blog_App

A simple blog application built with Node.js, Express, MongoDB, and EJS. Features include user signup/login with JWT authentication, blog CRUD operations, and a comment/reply system.

## Features
- User signup with username, email, password, and profile image
- Login with JWT token
- Dashboard with user blogs
- Create, read, update, delete blogs
- Comment and reply functionality
- 
## Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: EJS, custom CSS, vanilla JavaScript
- **Authentication**: JWT, bcrypt
- **File Uploads**: Multer

## Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/neo7812/My_blog_app.git
   cd My_blog_app
2. Install dependencies:
   ```bash
   npm install

3. Create a .env file with:

   JWT_SECRET=your_secret_key_here
   MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.mongodb.net/blogApp?retryWrites=true&w=majority

4. Run the app:
   ```bash
   npm start

5. Visit 


## NOTES
  Requires MongoDB running locally.







