#  My_Blog_App

A simple blog application built with Node.js, Express, MongoDB, and EJS. Features include user signup/login with JWT authentication, blog CRUD operations, and a comment/reply system.

## Features
- User signup with username, email, password, and profile image
- Login with JWT token
- Dashboard with user blogs
- Create, read, update, delete blogs
- Comment and reply functionality
- Image uploads for profiles and blogs using Cloudinary
 
## Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: EJS, custom CSS, vanilla JavaScript
- **Authentication**: JWT, bcrypt
- **File Uploads**:  Cloudinary 

## Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/neo7812/My_blog_app.git
   cd My_blog_app
2. Install dependencies:
   ```bash
   npm install

3. Create a .env file with:

   JWT_SECRET=your_jwt_secret_key
   MONGO_URI=your_mongodb_atlas_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

4. Run the app:
   ```bash
   npm start

5. Visit https://my-blog-app-neo7812s-projects.vercel.app/signup


## NOTES
  Requires MongoDB running remotely.







