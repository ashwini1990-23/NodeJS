# User Management REST API

A simple and clean RESTful API built using **Node.js**, **Express.js**, and **PostgreSQL** that performs basic **CRUD operations** on a `users` table.  
This project demonstrates backend fundamentals such as request validation, environment configuration, database integration, and clean API structure.

---

## 🚀 Features

- Create, Read, Update, and Delete users
- RESTful API design
- PostgreSQL database integration
- Request body validation using Joi
- Environment-based configuration using dotenv
- CORS enabled for cross-origin requests
- Clean and modular project structure

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Validation:** Joi  
- **Database Client:** pg  
- **Other Tools:** dotenv, cors  

---


## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DATABASE_NAME=your_database_name
DB_PORT=5432

📦 Installation & Setup

1. Clone the repository:
git clone https://github.com/ashwini1990-23/NodeJS/ExpressPostgresCRUD-API.git

2. Navigate to the project directory:
cd ExpressPostgresCRUD-API

3. Install dependencies:
npm install

4. Start the server:
npm start
The server will run on:
http://localhost:5000

📌 API Endpoints
Create User: POST /api/user
Get All Users: GET /api/user
Get User by ID: GET /api/user/:id
Update User: PUT /api/user/:id
Delete User: DELETE /api/user/:id

🧪 Validation

All incoming request bodies are validated using Joi
Prevents invalid or malformed data from reaching the database

🌱 Future Improvements

Authentication & Authorization (JWT)
Docker support
Unit & integration tests







