
---
# Resource Management Application

This project consists of two parts:

1. **Frontend**: A React app built with TypeScript, which allows users to view, filter, add, edit, and delete resources.
2. **Backend**: A Node.js/Express API that manages the resources in a MongoDB database.

The frontend and backend are developed as separate repositories. This README will guide you on how to set up and run both the frontend and backend.

---

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Frontend Setup Instructions](#frontend-setup-instructions)
3. [Backend Setup Instructions](#backend-setup-instructions)
4. [File Structure](#file-structure)
5. [Usage](#usage)
6. [Components Overview](#components-overview)
7. [API Integration](#api-integration)
8. [Conclusion](#conclusion)

---

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **API**: Axios for HTTP requests (frontend side)
- **Database**: MongoDB for storing resources

---

## Frontend Setup Instructions

The frontend of this application is built using React, TypeScript, and Tailwind CSS. Follow these steps to set it up on your local machine.

### Prerequisites

Ensure that you have the following installed:

- **Node.js** (version 14.x or above)
- **npm**

### Clone the Frontend Repository

```bash
git clone https://github.com/zee0401/Appcrafter-react.git
```

### Install Dependencies

Run the following command to install all dependencies:

```bash
npm install


### Configure Backend API URL

The frontend communicates with the backend through an API. Ensure that the API URL is correctly set in the frontend. You can create a `.env` file in the root of your frontend project and add the following:

```env
REACT_APP_API_URL=http://localhost:3000  # or the URL of your deployed backend
```

### Start the Frontend Development Server

Run the following command to start the frontend application:

```bash
npm run dev

```

The app will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Backend Setup Instructions

The backend of this application is built using Node.js, Express, and MongoDB. Here are the steps to set up the backend.

### Prerequisites

Ensure that you have the following installed:

- **Node.js** (version 14.x or above)
- **MongoDB** (locally or a cloud service like MongoDB Atlas)
- **npm** or **yarn**

### Clone the Backend Repository

```bash
git clone https://github.com/zee0401/App-crafter-Backend.git

```

### Install Dependencies

Run the following command to install the backend dependencies:

```bash
npm run dev
```

### Configure Environment Variables

Create a `.env` file in the root of the backend project and add the following environment variables:

```env
MONGO_URI=mongodb://localhost:27017/resourceDB  # Replace with your MongoDB URI
PORT=3000  # Backend server port
```

### Start the Backend Server

Run the following command to start the backend server:

```bash
npm run dev
```

The backend will be accessible at [http://localhost:3000]

---

## File Structure

### Frontend File Structure

```
/src
  /api                # API-related functions for resource management (CRUD operations)
  /components         # React components for UI elements (buttons, cards, tables, forms, etc.)
  /components/form-modal # Modal for adding/editing resources
  /components/ui      # UI-related components like buttons, labels, switches, etc.
  /types               # TypeScript types and interfaces
  /pages               # Pages for the frontend application
  /schema              # Form schema for resource management
  App.tsx              # Main component
  index.tsx            # Entry point for the app
  tailwind.config.js   # Tailwind CSS configuration
```

### Backend File Structure

```
/src
  /controllers        # Logic for handling requests (CRUD operations)
  /models             # Mongoose models for resource data
  /routes             # Express routes for API endpoints
  /config             # Configuration (e.g., database connection, JWT secret)
  /middleware         # Middleware for authentication and validation
  server.js           # Entry point for the backend server
  .env                # Environment variables (e.g., MongoDB URI, JWT secret)
```

---

## Usage

### Main Features

- **Frontend**: Allows users to view resources in either **Table View** or **Card View**. Resources can be filtered by type, and the filter can be cleared to display all resources.
- **Backend**: The backend exposes the following endpoints:
  - `GET /api/all-resources`: Fetch all resources.
  - `POST /api/add-resources`: Create a new resource.
  - `PUT /api/update-resources/:id`: Update an existing resource.
  - `DELETE /api/delete-resources/:id`: Delete a resource by its ID.

### Example of `ResourceType` Interface

The `ResourceType` interface defines the structure of a resource:

```ts
export interface ResourceType {
  _id: string;
  title: string;
  description: string;
  type: string;
}
```

### API Integration in Frontend

In the frontend, the API is called using `axios` to interact with the backend. Here's an example of how the frontend calls the backend API to fetch resources:

```ts
import axios from 'axios';

const fetchResources = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/resources`);
    setResources(response.data);
  } catch (error) {
    console.error("Error fetching resources", error);
  }
};
```

---

## Conclusion

This MERN stack application is a complete solution for managing resources. The **frontend** is built using React and communicates with the **backend**, which is built with Node.js and Express. Both parts are developed as separate repositories, and they communicate through API calls.

With this setup, you can easily modify or extend the backend and frontend separately. The frontend is customizable with different views (table or card), and the backend provides all the necessary endpoints to manage resources.

---

### How to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them.
4. Open a pull request describing your changes.

---

This concludes the README for the **MERN Resource Management Application**. If you have any further questions, feel free to open an issue or submit a pull request. Happy coding! 🎉

