# Project Name

This project is built with Express, Sequelize, React, and Ant Design.

## Features

- **All Products:** Retrieve all products.
- **Single Product:** Retrieve a single product by ID.
- **Add Product:** Add a new product.
- **Update Product:** Update an existing product.
- **Delete Product:** Delete a product by ID.
- **Register:** Register a new user.
- **Login:** Log in a user.

## Environment Setup

### Prerequisites

- Node.js installed 
- npm or yarn installed

### Backend Setup

1. Clone the repository: `git clone [<repository-url>](https://github.com/meetamjadsaeed/Express-Sequelize-React-AntDesign.git)`
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install` or `yarn install`
4. Set up your database configuration in `config/config.json`
5. Run migrations: `npx sequelize-cli db:migrate`
6. Start the backend server: `npm start` or `yarn start`

### Frontend Setup

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install` or `yarn install`
3. Start the frontend development server: `npm start` or `yarn start`

## Configuration

- Configure backend environment variables in `.env` file.

## Project Structure

- **Backend:** Contains Express server setup, Sequelize models, routes, controllers, and middleware.
- **Frontend:** Contains React components, Ant Design integration, Redux (if applicable), and API service integration.

## API Endpoints

- Backend API endpoints are defined in `backend/routes/`.

## Technologies Used

- **Backend:** Express.js, Sequelize (ORM)
- **Frontend:** React, Ant Design
- **Database:** PostgreSQL (or your preferred database)

## License

This project is licensed under the [MIT License](link-to-license).
