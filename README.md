# Food & Friends - Backend

The **Food & Friends** backend is built with Node.js and Express.js to manage
recipe-related data and user authentication.
It uses MongoDB for data persistence and Multer for file uploads.

---

## **Features**

- RESTful API for user and recipe management
- User authentication with password hashing
- Image upload functionality
- MongoDB integration with Mongoose
- Data validation and schema-based models

---

## **Technologies Used**

- Node.js
- Express.js
- MongoDB with Mongoose
- Multer for image upload handling
- bcrypt for password hashing

---

## **Folder Structure**

```plaintext
src/
├── models/
│   ├── User.js
│   ├── Recipe.js
├── routes/
│   ├──authRoutes.js
│   ├── userRoutes.js
│   ├── recipeRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   ├── uploadMiddleware.js
├── app.js
├── server.js
```

## **Technologies Used**

- **Node.js** - Provides a JavaScript runtime for the server-side logic of the application.
- **Express.js** - Serves as the web framework, simplifying routing and middleware setup.
- **MongoDB with Mongoose** - NoSQL database for storing recipe, user, and comment data. Mongoose provides schemas for data validation and relationships.
- **Multer** - Middleware for handling multipart form data, used for uploading images.
- **Dotenv** - Manages environment variables securely, keeping sensitive data like database URIs out of the codebase.

## **Usage Instructions**

1. **Clone the repository**:
   ```bash
   git clone git@github.com:nPrameelaPydi/capstone_backend.git
   cd food-and-friends-backend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. Set up .env file
   ```bash
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. The server will run at:
   ```bash
   http://localhost:3000. Use tools like Postman to test API endpoints.
   ```

## **Approach Taken**

### **Backend Development**

1. **RESTful API Design**: Organized endpoints by resources (e.g., `/recipes`, `/users`) to ensure logical separation of concerns.
2. **Schema Design**:
   - `Recipe` schema includes fields for title, ingredients, instructions, createdBy (referenced to a User), and timestamps.
   - `User` schema contains fields for name, email, and timestamps.
   - Referenced ObjectIDs between `Recipe` and `User` to establish relationships.
3. **Validation**: Added validation rules at the schema level (e.g., required fields, default values) to enforce data integrity.
4. **Image Handling**: Enabled image uploads and tied images to recipes for better content enrichment.
5. **Error Handling**: Used centralized error-handling middleware to manage and log errors systematically.

## API Endpoints

User Routes:

    POST /api/users/register: Register a new user.
    POST /api/users/login: Login for existing users.

Recipe Routes:

    GET /api/recipes: Fetch all recipes.
    POST /api/recipes: Create a new recipe.
    PATCH /api/recipes/:id: Update a specific recipe.
    DELETE /api/recipes/:id: Delete a specific recipe.
    POST /api/recipes/upload-image: Upload an image for a recipe.

## Unsolved Problems

- Authentication Enhancements: Implement JWT token expiration handling and add password reset functionality.
- Reset Password: Implement reset password using Nodemailer which is used to send reset password emails by generating secure links or OTPs and delivering them to users' email addresses for account recovery.
- Scalability of Image Storage: Currently, images are handled locally or in basic storage. Integration with cloud storage (e.g., AWS S3) to be planned
- Bulk Actions: Features like bulk recipe uploads or bulk deletions are yet to be added.

## How to Contribute

- Fork the repository.
- Create a new branch: git checkout -b feature-name.
- Make your changes and commit them: git commit -m 'Add feature'.
- Push to the branch: git push origin feature-name.
- Submit a pull request.

## **Acknowledgments**

- **Multer**  
  For handling file uploads, especially recipe images.  
  [Multer Documentation](https://github.com/expressjs/multer)
- **Bcrypt**  
  For hashing user passwords  
  [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
