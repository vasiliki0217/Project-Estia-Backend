# Estia Project - Backend
This repository contains the backend code for the Estia Project, which provides an API for managing businesses, addresses, users, and reviews.  
Estia is an application that helps families find child-friendly spots like cafes, restaurants, activity centers, etc.  
For the frontend part you can visit the [Project-Estia](https://github.com/Evangelia93/Project-Estia) .

## 📌 Project Overview
* The backend is built using **Node.js** and **Express**.
* **PostgreSQL** is used as the database.
* The API is hosted on **Heroku**.
* **JWT (JSON Web Tokens)** is used for authentication.

---
  
## ✅ Features Implemented

### 🔹 User Management
- **User Registration**  
  - Stores user credentials securely using bcrypt for password hashing.
- **User Login**  
  - Uses JWT authentication for secure login.
- **JWT Token Generation**  
  - Ensures protected routes require authentication.

### 🔹 Business Management
- **Fetch all businesses**
- **Fetch a specific business**
- **Fetch a business with its address**

### 🔹 Address Management
- **Fetch all addresses**
- **Fetch a specific address**

### 🔹 Reviews
- **Add a review**  
  - Allows users to submit a rating and comment for a business.  
  - 🛠 *To-Do: Add review deletion and update functionality.*

### 🔹 CORS Configuration
- Configured CORS to allow requests only from the frontend application.

### 🔹 Environment Variables
- Stored securely using **Heroku config vars** for:
  - `DATABASE_URL`
  - `JWT_SECRET`

---

## 🛠 Database

Below is the database schema that represents the relationships between different entities in the project.

![Database Schema](https://github.com/vasiliki0217/Project-Estia-Backend/blob/main/db-schema.png)

### 📋 Explanation of Schema:
- **Business**: Stores details of all businesses.
- **User**: Stores user accounts, authentication details, and business ownership (if applicable).
- **Address**: Stores business location details.
- **Reviews**: Users can leave reviews and ratings for businesses.
- **Images**: Stores images associated with businesses.
- **Business Features**: Stores business-specific attributes such as indoor playground, parking space, etc.
- **Favorites**: Allows users to favorite businesses.

---

## 📡 API Endpoints
**Base URL:** `https://estiaproject-b3ef95234cdd.herokuapp.com/api/v1`

### Users

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/v1/users/` | Fetch all users (for testing) |
| GET | `/api/v1/users/{id}` | Fetch user details by ID (for testing) |
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/login` | Authenticate a user |
| POST | `/api/v1/users/{id}/add_review/{id_business}` | Add a review for a business |

### Businesses

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/v1/business/` | Fetch all businesses |
| GET | `/api/v1/business/{id}` | Fetch business details by ID |
| GET | `/api/v1/business/{id}/address_details` | Fetch business details with address |
| GET | `/api/v1/business/{id}/business_features` | Fetch business details with features |
| GET | `/api/v1/business/{id}/business_reviews` | Fetch business details with reviews |
| POST | `/api/v1/business/?idBusiness={idBusiness}&isPrimary={isPrimary}` | uploads a picture to a business |


### Addresses

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/v1/address/` | Fetch all addresses (for testing) |
| GET | `/api/v1/address/{id}` | Fetch address details by ID (for testing) |


### API Description

#### Upload a picture to a business

Method: POST
Endpoint: /api/v1/business/?idBusiness={idBusiness}&isPrimary={isPrimary}
Parameters: using req query
    - idBusiness - is a number and represents the id of the business for which you are adding a picture. This must be a valid id business
    - isPrimary - represents if the picture that is uploading is or not the primary picture for the business. This can have one of two values:  1 - is primary; 0 - is not primary.
                  This is optional. If it is omited the value will be 0.


---

## 🚀 Future Goals

These are features planned for future implementation:

### Review Deletion & Editing
- Allow users to delete and update their reviews.

### Business Search & Filters
- Add search functionality for businesses based on name, category, or location.
- Implement rating-based filters.

### Add Favorite Button
- Allows users to favorite businesses.

### Admin Dashboard
- A panel for admin users to manage businesses & users.

### Email Verification on Registration
- Implement email verification for new user signups.

### Frontend Deployment & Integration
- Deploy the frontend separately and ensure it integrates seamlessly with the backend.

---

## 🤖 Contributors
   Name | GitHub Profile | Contributions |
|------|--------------|--------------|
| **Vasiliki Korai** | https://github.com/vasiliki0217 | Architected and Developed Backend, API, DB Schema, DB Creation & Authentication |

