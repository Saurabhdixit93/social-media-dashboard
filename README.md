

# Social Media Dashboard

## Overview

Welcome to the Social Media Dashboard project, a modern web application that combines the power of React.js on the client-side with a robust Node.js-based backend server. This dashboard allows users to sign up, log in, create posts, comment on posts, like and dislike content, providing a rich social media experience.

## Technologies Used

### Client-Side (React.js)

- **React.js**: A popular JavaScript library for building dynamic and responsive user interfaces.
- **React Router**: For managing client-side routing and navigation seamlessly.
- **React Icons**: A library for easily incorporating icons into the user interface.
- **Axios**: A promise-based HTTP client for making API requests to the backend server.
- **Context API**: Used for state management within the React application, ensuring a smooth user experience.

### Server-Side (Node.js)

- **Node.js**: A JavaScript runtime environment that facilitates server-side development.
- **Express.js**: A minimal and flexible Node.js web application framework that powers our backend server.
- **MongoDB**: A flexible and scalable NoSQL database for storing user data, posts, comments, and likes.
- **Mongoose**: An elegant MongoDB ODM (Object-Document Mapping) library for defining schemas and models.
- **JWT (JSON Web Tokens)**: Ensures secure user authentication.
- **Bcrypt**: Used to hash and salt user passwords for enhanced security.
- **dotenv**: A zero-dependency module for managing environment variables.

## Features

- **User Registration**: Users can easily sign up for an account, providing their credentials securely.
- **User Authentication**: Registered users can log in securely to access the dashboard's features.
- **Post Creation**: Users can create and share posts, allowing them to express themselves.
- **Commenting**: Users can engage in conversations by commenting on posts.
- **Like and Dislike**: Show appreciation or disagreement by liking and disliking posts and comments.

## Getting Started

### Prerequisites

Before setting up the application, ensure that you have the following installed:

- **Node.js**: Download and install it from [https://nodejs.org/](https://nodejs.org/).
- **MongoDB**: Set up a MongoDB database and have its connection URL ready.

### Client-Side Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/saurabhdixit93/social-media-dashboard.git
   ```

2. Change to the client directory:

   ```bash
   cd social-media-dashboard/client
   ```

3. Install the client-side dependencies:

   ```bash
   npm install
   ```

### Server-Side Setup

1. Change to the server directory:

   ```bash
   cd ../server
   ```

2. Install the server-side dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory:

   ```env
   # Database configuration
   MONGO_URL=your-database-connection-url

   # JWT secret key (for authentication)
   SECRET_KEY=your-secret-key

   # Port for the server
   PORT=6000
   ```

   Replace `your-database-connection-url` with the URL of your MongoDB database and `your-secret-key` with a strong, unique secret key.

### Running the Application

1. Start the server:

   ```bash
   npm start
   ```

   The server will run on the port specified in the `.env` file (default is 6000).

2. Change to the client directory:

. Create a `.env` file in the client directory:

    ```env
    # Database configuration
    REACT_APP_BASEURL_BACKEND=your-backend-url

    ```

    ```bash
    cd ../client
    ```

3. Start the client:

   ```bash
   npm start
   ```

   Access the application in your web browser at `http://localhost:3000` (or the specified port).

## Usage

1. **Sign Up**: Create a new account by clicking the "Sign Up" link and filling out the registration form.

2. **Log In**: After registration, log in with your credentials.

3. **Create a Post**: Once logged in, you can create a new post by clicking the "Create Post" button.

4. **Comment**: You can comment on posts by clicking the "Comment" button on a post and entering your comment.

5. **Like/Dislike**: Show your appreciation for posts and comments by clicking the "Like" or "Dislike" button.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This project was inspired by the need for a simple social media dashboard.
