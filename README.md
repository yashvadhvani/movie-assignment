# Movie Assignment

Welcome to the Movie Assignment project! This README provides a brief overview of the directory structure and setup instructions.

## Directory Structure

This project follows a specific directory structure:

```

/
|-- backend/ # Backend server code
|-- frontend/ # Frontend client code
|-- README.md # This file
|-- .gitignore # Git ignore rules
|-- package.json # Project configuration
|-- ... # Other files

```

- `backend/`: Contains the backend server code, including your Nest.js application and Prisma setup.
- `frontend/`: Houses the frontend client code, which may include your React application.
- `README.md`: This file.
- `.gitignore`: Git ignore rules to exclude unnecessary files from version control.
- `package.json`: Project configuration and dependencies.
- ...: Other files or directories specific to your project.

## Installation

Before running your project, ensure you have installed the necessary Node.js modules for both the frontend and backend. Follow the steps below:

### Frontend

1. Navigate to the `frontend` directory:

   ```sh
   cd frontend
   ```

2. Install frontend dependencies:

   ```sh
   npm install
   ```

### Backend

1. Navigate to the `backend` directory:

   ```sh
   cd backend
   ```

2. Install backend dependencies:

   ```sh
   npm install
   ```

## Initialize and Start the Project

This project provides a convenient script to initialize Prisma migrations and start the application in one command:

```sh
npm run init:start
```

Here's what the script does:

1. **Initialize Prisma migrations:**

   ```sh
   npm run init
   ```

   This command will navigate to the `backend` directory and initialize Prisma migrations with the name "init."

2. **Start the project:**

   ```sh
   npm start
   ```

   This will run the backend and frontend parts of your application concurrently. You should see both servers running in your terminal.

## Accessing Your Project

- Frontend: Your frontend app can be accessed in a web browser at [http://localhost:5173](http://localhost:5173).
- Backend: Your backend server is running on port 3000.

Now, your Movie Assignment project is ready to use.

## Access Swagger Documentation

- Swagger documentation for the backend API is available at: http://localhost:3000/api
