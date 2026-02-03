# Express REST API with JWT Authentication & MongoDB

A secure RESTful API built using **Node.js**, **Express.js**, and **MongoDB** that provides **user authentication (JWT-based)** and **user-specific CRUD operations** for a Contact resource.

This project demonstrates best practices for backend development, including authentication, authorization, protected routes, and clean API structure.

---

## 🚀 Features

- User Registration & Login
- JWT-based Authentication
- Protected Routes
- User-specific Contact CRUD Operations
- MongoDB with Mongoose ODM
- Password Hashing using bcrypt
- Input Validation
- RESTful API Design
- Environment Variable Configuration

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** bcrypt
- **Environment Config:** dotenv

---

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

PORT=8000
CONNECTION_STRING=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret

---

## 📦 Installation & Setup

1. Clone the repository:
   git clone https://github.com/ashwini1990-23/NodeJS/ContactManagementApp.git

2. Navigate to the project directory:
   cd your-repo-name

3. Install dependencies:
   npm install

4. Start the server:
   npm run dev
   The server will start on `http://localhost:8000`

---

## 🔐 Authentication Flow

1. User registers with username, email and password
2. Password is hashed and stored securely
3. On login, a JWT token is generated
4. JWT is sent in request headers for protected routes
5. Middleware validates token and attaches user info to request

---

## 📌 API Endpoints

### Auth Routes

| Method | Endpoint              | Description            | Access |
| ------ | --------------------- | ---------------------- | ------ |
| POST   | `/api/users/register` | Register a new user    | Public |
| POST   | `/api/users/login`    | Login user & get token | Public |

### Contact Routes (Protected)

> Requires JWT token in headers:  
> `Authorization: Bearer <token>`
> | Method | Endpoint | Description |
> |------|----------------------|-----------------------------|
> | GET | `/api/contacts` | Get all user contacts |
> | POST | `/api/contacts` | Create a new contact |
> | GET | `/api/contacts/:id` | Get contact by ID |
> | PUT | `/api/contacts/:id` | Update contact |
> | DELETE | `/api/contacts/:id` | Delete contact |

---

## 🧪 Example Request Header

Authorization: Bearer your_jwt_token_here
Content-Type: application/json

---

## 🔒 Authorization Logic

- Users can only access **their own contacts**
- Ownership is validated using the user ID from JWT
- Unauthorized access returns appropriate HTTP errors

---

## 🧑‍💻 Future Improvements

- Role-based access control (RBAC)
- Refresh tokens
- Pagination & filtering
- API rate limiting
- Dockerizing the app
- Unit & integration tests

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Author

**Ashwini Patil**  
Backend Developer (Node.js, Express, MongoDB, PostgreSQL, Docker, AWS)

If you like this project, don’t forget to ⭐ the repository!
