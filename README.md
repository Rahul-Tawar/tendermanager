# Tender Management System 

![kritikal-logo](backend/public/KritiKal-logo.png)

## Overview

The Tender Management System is a comprehensive web application designed to streamline the process of creating, managing, and evaluating tenders. It consists of a robust backend API built with Node.js and Express, and a user-friendly frontend developed using React, Vite, and Redux. This system allows users to sign up, create tenders, submit bids, and manage the entire evaluation process efficiently. With features like document upload, user authentication, and a responsive interface, it provides a complete solution for organizations dealing with tender management.

## backend

This project is a RESTful API for a Tender Management System. It allows users to sign up, log in, create tenders, submit bids, and manage the evaluation process. The API is built using Node.js and Express, with MySQL as the database and Sequelize as the ORM.

## Frontend

The frontend of the Tender Management System is built using React, Vite, shadcnUI and Redux. It provides an intuitive user interface for interacting with the backend API. Users can easily navigate through different sections of the application, including tender creation, bid submission, and evaluation management.

- **React**: A JavaScript library for building user interfaces, used to create dynamic and responsive components.
- **Vite**: A build tool that provides a fast development environment and optimized build for React applications.
- **Redux**: A state management library used to manage the application state in a predictable way.
- **TailwindCSS**: A utility-first CSS framework that provides pre-built styles for common UI components.
- **ShadcnUI**: A UI component library for accessing pre-built styles and components.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Frontend](#frontend)

## Features

- User authentication (signup and login)
- Tender creation and management
- Bid submission and retrieval
- Tender document upload and management
- Evaluation process

## Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- Multer (for document uploads)
- React
- TailwindCSS
- redux
- ShadcnUI

## Project Structure

```
src/
├── config/
│   ├── config.js
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── bidController.js
│   ├── evaluationController.js
│   ├── tenderController.js
│   └── tenderDocumentController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── logger.js
├── models/
│   ├── bidModel.js
│   ├── evaluationModel.js
│   ├── tenderDocumentModel.js
│   ├── tenderModel.js
│   └── userModel.js
├── routes/
│   ├── authRoutes.js
│   ├── bidRoutes.js
│   ├── evaluationRoutes.js
│   ├── tenderDocumentRoute.js
│   └── tenderRoutes.js
├── utils/
│   ├── logger.js
│   └── validation.js
└── app.js
```

## Setup

1. Clone the repository:
   ```
   git clone https://gitlab.kritikal.in:9595/systems/ssdd_intern.git
   cd ssdd_intern/01_Software/tenderManager/backend   
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the MySQL database and update `.env` file and the configuration in `src/config/config.js`.

4. Start the server:
   ```
   npm start
   ```
   The frontend application will be available at `http://localhost:5173` (or another port if configured differently).

## API Endpoints

Here's a brief overview of the main API endpoints:

- **Auth:**
  - POST /api/auth/signup
  - POST /api/auth/login

- **Tenders:**
  - GET /api/tenders
  - POST /api/tenders
  - GET /api/tenders/:id
  - PUT /api/tenders/:id
  - DELETE /api/tenders/:id

- **Bids:**
  - GET /api/bids
  - POST /api/bids
  - GET /api/bids/:id

- **Evaluations:**
  - GET /api/evaluations
  - POST /api/evaluations
  - GET /api/evaluations/:id

- **Tender Documents:**
  - POST /api/tender-documents
  - GET /api/tender-documents/:id

For detailed information about request/response formats, please refer to the API documentation.

## Authentication

This API uses JWT (JSON Web Tokens) for authentication. To access protected routes, include the JWT token in the Authorization header of your requests:

```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

The API uses a centralized error handling middleware (`errorMiddleware.js`). It catches all errors thrown in the application and sends appropriate error responses to the client.

## Logging

The application uses a custom logging solution (`utils/logger.js`) to log important events and errors. Logs are crucial for monitoring and debugging the application in production.

## Frontend

The frontend application for the Tender Management System provides a user interface to interact with the API. Follow these steps to set up and start the frontend:

### Setup

1. **Clone the frontend repository:**
   ```
   git clone https://gitlab.kritikal.in:9595/systems/ssdd_intern.git
   cd ssdd_intern/01_Software/tenderManager/frontend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Start the development server:**
   ```
   npm run dev
   ```

   The frontend application will be available at `http://localhost:5173` (or another port if configured differently).

### Configuration

Ensure that the frontend is configured to communicate with the backend API by updating the API base URL in the configuration files if necessary.

---

For more detailed information about each module and its functionality, please refer to the comments in the respective files.