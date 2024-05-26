# API Requests Documentation

## 1. Users

### Create User

- **Method:** POST
- **URL:** `/users`
- **Request Body:** JSON with fields `username`, `email`, `password`.
- **Request Body Example:**
  ```json
  {
    "username": "example",
    "email": "example@example.com",
    "password": "password123"
  }
  ```

### User Login

- **Method:** POST
- **URL:** `/users/login`
- **Request Body:** JSON with fields `email`, `password`.
- **Request Body Example:**
  ```json
  {
    "email": "example@example.com",
    "password": "password123"
  }
  ```

### Get Current User

- **Method:** GET
- **URL:** `/users/user`

## 2. Transactions

### Create Transaction

- **Method:** POST
- **URL:** `/transaction`
- **Request Body:** JSON with fields `name`, `date`, `price`, `category`.
- **Request Body Example:**
  ```json
  {
    "name": "Coffee",
    "date": "2023-01-01",
    "price": "5.00",
    "category": "Food"
  }
  ```

### Get All Transactions

- **Method:** GET
- **URL:** `/transaction`

### Delete Transaction

- **Method:** DELETE
- **URL:** `/transaction/:id`
- **URL Parameters:** `id` - transaction identifier.

## 3. User Transactions

### Create User Transaction

- **Method:** POST
- **URL:** `/user-transaction`
- **Request Body:** JSON with an array of transactions.
- **Request Body Example:**
  ```json
  {
    "transactions": [
      {
        "name": "Groceries",
        "date": "2023-01-02",
        "price": "150.00",
        "category": "Food"
      }
    ]
  }
  ```

### Get User Transaction

- **Method:** GET
- **URL:** `/user-transaction`

### Update User Transaction

- **Method:** PATCH
- **URL:** `/user-transaction/:id`
- **URL Parameters:** `id` - user transaction identifier.
- **Request Body:** JSON with updated transaction data.
- **Request Body Example:**
  ```json
  {
    "transactions": [
      {
        "name": "Supermarket",
        "date": "2023-01-03",
        "price": "200.00",
        "category": "Food"
      }
    ]
  }
  ```

### Delete User Transaction

- **Method:** DELETE
- **URL:** `/user-transaction/:id`
- **URL Parameters:** `id` - user transaction identifier.

## 4. Incomes

### Create Income

- **Method:** POST
- **URL:** `/income`
- **Request Body:** JSON with an array of incomes.
- **Request Body Example:**
  ```json
  {
    "income": [
      {
        "name": "Salary",
        "date": "2023-01-05",
        "amount": "1000.00",
        "category": "Salary"
      }
    ]
  }
  ```

### Get All Incomes

- **Method:** GET
- **URL:** `/income`

### Update Income

- **Method:** PATCH
- **URL:** `/income/:id`
- **URL Parameters:** `id` - income identifier.
- **Request Body:** JSON with updated income data.
- **Request Body Example:**
  ```json
  {
    "income": [
      {
        "name": "Bonus",
        "date": "2023-01-06",
        "amount": "500.00",
        "category": "Bonus"
      }
    ]
  }
  ```

### Delete Income

- **Method:** DELETE
- **URL:** `/income/:id`
- **URL Parameters:** `id` - income identifier.
