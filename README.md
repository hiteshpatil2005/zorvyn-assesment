# Finance Backend

A Node.js Express backend application for managing financial records with role-based access control.

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)
- **npm** (comes with Node.js)

## Installation

1. **Navigate to the project directory:**
```bash
cd finance-backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file** in the root directory with the following variables:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/financeDB
NODE_ENV=development
```

**MongoDB Connection String:**
- Replace `username` and `password` with your MongoDB Atlas credentials
- Replace `cluster` with your actual cluster name
- Use `financeDB` as the database name (or your preferred database name)

**Example (your setup):**
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.rkbgruy.mongodb.net/financeDB
```

## Running the Server

Start the backend server:
```bash
npm run start
```

The server will start on `http://localhost:5000` with auto-reload enabled (using nodemon).

You should see:
```
Server running on port 5000
MongoDB Connected
```

## API Endpoints

### Users Management
**Base URL:** `http://localhost:5000/api/users`

#### Create User (POST)
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin",
    "isActive": true
  }'
```

**Request Body:**
- `name` (required): User's full name
- `email` (optional): User's email address
- `role` (optional): User role - `viewer`, `analyst`, or `admin` (default: `viewer`)
- `isActive` (optional): Account status (default: `true`)

#### Get All Users (GET)
```bash
curl http://localhost:5000/api/users
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Records Management
**Base URL:** `http://localhost:5000/api/records`

#### Create Record (POST) - Admin only
```bash
curl -X POST http://localhost:5000/api/records \
  -H "Content-Type: application/json" \
  -H "role: admin" \
  -d '{
    "description": "Monthly expense",
    "amount": 1000,
    "type": "expense"
  }'
```

#### Get All Records (GET) - Viewer, Analyst, Admin
```bash
curl http://localhost:5000/api/records \
  -H "role: viewer"
```

#### Update Record (PUT) - Admin only
```bash
curl -X PUT http://localhost:5000/api/records/{id} \
  -H "Content-Type: application/json" \
  -H "role: admin" \
  -d '{"amount": 1500}'
```

#### Delete Record (DELETE) - Admin only
```bash
curl -X DELETE http://localhost:5000/api/records/{id} \
  -H "role: admin"
```

### Dashboard
**Base URL:** `http://localhost:5000/api/dashboard`

#### Get Summary (GET) - Analyst, Admin
```bash
curl http://localhost:5000/api/dashboard/summary \
  -H "role: analyst"
```

## Role-Based Access Control

The application uses role-based access control. Send the `role` header with requests:

| Endpoint | Viewer | Analyst | Admin |
|----------|--------|---------|-------|
| POST /api/users | ❌ | ❌ | ✅ |
| GET /api/users | ❌ | ❌ | ✅ |
| POST /api/records | ❌ | ❌ | ✅ |
| GET /api/records | ✅ | ✅ | ✅ |
| PUT /api/records | ❌ | ❌ | ✅ |
| DELETE /api/records | ❌ | ❌ | ✅ |
| GET /api/dashboard/summary | ❌ | ✅ | ✅ |

**Default Role:** If no `role` header is provided, requests default to `admin` role.

## Testing with Postman

1. **Import requests:**
   - Create a new Collection
   - Add requests with the endpoints above

2. **Example POST Request:**
   - **Method:** POST
   - **URL:** `http://localhost:5000/api/users`
   - **Headers:** `Content-Type: application/json`
   - **Body (raw JSON):**
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "role": "admin"
   }
   ```

## Project Structure

```
finance-backend/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── middleware/
│   │   └── auth.middleware.js # Role-based access control
│   └── modules/
│       ├── user/
│       │   ├── user.model.js
│       │   ├── user.controller.js
│       │   └── user.routes.js
│       ├── record/
│       │   ├── record.model.js
│       │   ├── record.controller.js
│       │   └── record.routes.js
│       └── dashboard/
│           ├── dashboard.controller.js
│           └── dashboard.routes.js
├── server.js                 # Entry point
├── .env                      # Environment variables (create this)
├── package.json
└── README.md
```

## Sample Data Setup

Create sample users:

```bash
# Admin User
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin User","email":"admin@test.com","role":"admin"}'

# Analyst User
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Analyst User","email":"analyst@test.com","role":"analyst"}'

# Viewer User
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Viewer User","email":"viewer@test.com","role":"viewer"}'
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `MongoDB Connected` but server won't start | Check MongoDB connection string in `.env` |
| `Role header is required` error | Ensure role header is sent or default role (admin) is used |
| Port 5000 already in use | Change PORT in `.env` or kill the process using port 5000 |
| Nodemon not restarting | Check file extensions in nodemon config (currently: js, mjs, cjs, json) |

## Development

- **Auto-reload:** Changes to files automatically restart the server (nodemon)
- **Default role:** Requests without role header default to `admin`
- **Database:** All data is persisted in MongoDB

## Scripts

```bash
npm run start    # Start the server with nodemon
npm test         # Run tests (if configured)
```

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management
- **nodemon** - Auto-reload during development

## License

ISC
