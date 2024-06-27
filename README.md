# Zaayka

Zaayka is a comprehensive food delivery platform designed to connect users with their favorite restaurants. It features a seamless user interface, efficient backend processes, and an admin panel for order and food management.

## Project Structure

The project is divided into three main sub-folders:

1. **frontend**: Contains the client-side code, including the user interface and user experience elements.
2. **backend**: Manages the server-side logic, database interactions, and API endpoints.
3. **admin**: Interface for the administrator to manage orders and food items.

## Live Deployment

The application is deployed and live at: [zaayka.onrender.com](https://zaayka.onrender.com)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository**
    ```sh
    git clone https://github.com/ktejas04/zaayka.git
    cd zaayka
    ```

2. **Install dependencies for the frontend**
    ```sh
    cd frontend
    npm install
    ```

3. **Install dependencies for the backend**
    ```sh
    cd ../backend
    npm install
    ```

4. **Install dependencies for the admin panel**
    ```sh
    cd ../admin
    npm install
    ```

### Running the Application

1. **Start the frontend**
    ```sh
    cd frontend
    npm run dev
    ```

    This will run the frontend on `http://localhost:5173`.

2. **Start the backend**
    ```sh
    cd ../backend
    npm run server
    ```

    This will run the backend server on `http://localhost:8000`.

3. **Start the admin panel**
    ```sh
    cd ../admin
    npm run dev
    ```

    This will run the admin panel on `http://localhost:5174`.

### Environment Variables

Make sure to set up the necessary environment variables for the backend. Create a `.env` file in the `backend` folder with the following content:

```plaintext
PORT=8000
CORS_ORIGIN=*

MONGODB_URI=your_mongodb_uri
JWT_SECRET=_your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret


ADMIN_ID=your_admin_id
ADMIN_PASSWORD=your_admin_password

For Admin ID and password, you can set them to anything you wish. They will be your credentials for accessing the admin panel.
```
