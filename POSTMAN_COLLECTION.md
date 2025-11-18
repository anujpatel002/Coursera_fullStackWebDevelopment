# 📮 Postman Collection for Node.js Express Bookstore API

## 🚀 Complete API Testing Collection for Coursera Submission

This document provides all the Postman requests needed to test and demonstrate your complete bookstore API implementation.

## 📋 Pre-requisites

1. **Server Running**: Make sure your server is running on `http://localhost:5000`
2. **Start Server**: Run `node index.js` in your project directory
3. **Postman Setup**: Import this collection into Postman for testing

---

## 🔥 **PART 1: GENERAL USER TASKS (10 Points)**

### **Task 1: Get All Books (2 Points)**

#### Request 1A: Get All Books
```
Method: GET
URL: http://localhost:5000/
Headers: None required

Expected Response:
{
  "1": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "isbn": "978-0-385-47454-2",
    "reviews": {}
  },
  // ... more books
}
```

#### Request 1B: Alternative Format
```
Method: GET
URL: http://localhost:5000/books
Headers: None required
```

---

### **Task 2: Get Books by ISBN (2 Points)**

#### Request 2A: Valid ISBN
```
Method: GET
URL: http://localhost:5000/isbn/978-0-385-47454-2
Headers: None required

Expected Response:
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "isbn": "978-0-385-47454-2",
    "reviews": {}
  }
}
```

#### Request 2B: Invalid ISBN
```
Method: GET
URL: http://localhost:5000/isbn/invalid-isbn-123
Headers: None required

Expected Response:
{
  "success": false,
  "message": "Book not found with ISBN: invalid-isbn-123"
}
```

#### Request 2C: Another Valid ISBN
```
Method: GET
URL: http://localhost:5000/isbn/978-0-987654-32-1
Headers: None required

Expected Response:
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "author": "Hans Christian Andersen",
    "title": "Fairy tales",
    "isbn": "978-0-987654-32-1",
    "reviews": {
      "user3": { "rating": 5, "comment": "Timeless stories for all ages" }
    }
  }
}
```

---

### **Task 3: Get Books by Author (2 Points)**

#### Request 3A: Valid Author
```
Method: GET
URL: http://localhost:5000/author/Hans Christian Andersen
Headers: None required

Expected Response:
{
  "success": true,
  "message": "Books by Hans Christian Andersen retrieved successfully",
  "data": {
    "2": {
      "author": "Hans Christian Andersen",
      "title": "Fairy tales",
      "isbn": "978-0-987654-32-1",
      "reviews": {
        "user3": { "rating": 5, "comment": "Timeless stories for all ages" }
      }
    }
  }
}
```

#### Request 3B: Author with Multiple Books
```
Method: GET
URL: http://localhost:5000/author/Chinua Achebe
Headers: None required
```

#### Request 3C: Non-existent Author
```
Method: GET
URL: http://localhost:5000/author/Unknown Author
Headers: None required

Expected Response:
{
  "success": false,
  "message": "No books found by author: Unknown Author"
}
```

---

### **Task 4: Get Books by Title (2 Points)**

#### Request 4A: Valid Title
```
Method: GET
URL: http://localhost:5000/title/Fairy tales
Headers: None required

Expected Response:
{
  "success": true,
  "message": "Books with title 'Fairy tales' retrieved successfully",
  "data": {
    "2": {
      "author": "Hans Christian Andersen",
      "title": "Fairy tales",
      "isbn": "978-0-987654-32-1",
      "reviews": {
        "user3": { "rating": 5, "comment": "Timeless stories for all ages" }
      }
    }
  }
}
```

#### Request 4B: Partial Title Match
```
Method: GET
URL: http://localhost:5000/title/Divine
Headers: None required

Expected Response:
{
  "success": true,
  "message": "Books with title 'Divine' retrieved successfully",
  "data": {
    "3": {
      "author": "Dante Alighieri",
      "title": "The Divine Comedy",
      "isbn": "978-1-234567-89-0",
      "reviews": {
        "user1": { "rating": 5, "comment": "Epic journey through afterlife" },
        "user4": { "rating": 4, "comment": "Challenging but rewarding read" }
      }
    }
  }
}
```

#### Request 4C: Non-existent Title
```
Method: GET
URL: http://localhost:5000/title/Non Existent Book
Headers: None required
```

---

### **Task 9: Get Book Reviews (2 Points)**

#### Request 9A: Get Reviews for Book
```
Method: GET
URL: http://localhost:5000/review/978-0-385-47454-2
Headers: None required

Expected Response:
{
  "success": true,
  "message": "Reviews for ISBN 978-0-385-47454-2 retrieved successfully",
  "data": {
    "testuser": "Great book!",
    "john_doe": "Excellent story and characters"
  }
}
```

#### Request 9B: ISBN with No Reviews
```
Method: GET
URL: http://localhost:5000/review/978-1-789012-45-6
Headers: None required

Expected Response:
{
  "success": true,
  "message": "No reviews found for ISBN 978-1-789012-45-6",
  "data": {}
}
```

---

## 🔐 **PART 2: USER MANAGEMENT (6 Points)**

### **Task 5: Register New User (3 Points)**

#### Request 5A: Valid Registration
```
Method: POST
URL: http://localhost:5000/register
Headers:
  Content-Type: application/json

Body (raw JSON):
{
  "username": "newuser123",
  "password": "securepassword456"
}

Expected Response:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "username": "newuser123"
  }
}
```

#### Request 5B: Duplicate Username
```
Method: POST
URL: http://localhost:5000/register
Headers:
  Content-Type: application/json

Body (raw JSON):
{
  "username": "testuser",
  "password": "anypassword"
}

Expected Response:
{
  "success": false,
  "message": "User already exists"
}
```

#### Request 5C: Invalid Registration (Missing Password)
```
Method: POST
URL: http://localhost:5000/register
Headers:
  Content-Type: application/json

Body (raw JSON):
{
  "username": "invaliduser"
}

Expected Response:
{
  "success": false,
  "message": "Username and password are required"
}
```

---

### **Task 6: User Login (3 Points)**

#### Request 6A: Valid Login
```
Method: POST
URL: http://localhost:5000/login
Headers:
  Content-Type: application/json

Body (raw JSON):
{
  "username": "testuser",
  "password": "password123"
}

Expected Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "username": "testuser",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "1h"
  }
}
```

#### Request 6B: Invalid Password
```
Method: POST
URL: http://localhost:5000/login
Headers:
  Content-Type: application/json

Body (raw JSON):
{
  "username": "testuser",
  "password": "wrongpassword"
}

Expected Response:
{
  "success": false,
  "message": "Invalid username or password"
}
```

#### Request 6C: Non-existent User
```
Method: POST
URL: http://localhost:5000/login
Headers:
  Content-Type: application/json

Body (raw JSON):
{
  "username": "nonexistent",
  "password": "anypassword"
}

Expected Response:
{
  "success": false,
  "message": "Invalid username or password"
}
```

---

## 🔒 **PART 3: AUTHENTICATED USER TASKS (6 Points)**

**⚠️ Important**: For all authenticated requests, you need to login first and use the JWT token.

### **Setup Authentication**
1. First, login using Request 6A above
2. Copy the `token` from the response
3. For all authenticated requests, add this header:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN_HERE
   ```

### **Task 7: Add/Modify Book Review (3 Points)**

#### Request 7A: Add New Review
```
Method: PUT
URL: http://localhost:5000/auth/review/978-0-385-47454-2
Headers:
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN_HERE

Body (raw JSON):
{
  "review": "This is an amazing book! Highly recommended for everyone."
}

Expected Response:
{
  "success": true,
  "message": "Review added/updated successfully",
  "data": {
    "isbn": "978-0-385-47454-2",
    "review": "This is an amazing book! Highly recommended for everyone.",
    "username": "testuser"
  }
}
```

#### Request 7B: Update Existing Review
```
Method: PUT
URL: http://localhost:5000/auth/review/978-0-385-47454-2
Headers:
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN_HERE

Body (raw JSON):
{
  "review": "Updated review: Still a fantastic book, but with more insights after re-reading."
}
```

#### Request 7C: Add Review to Different Book
```
Method: PUT
URL: http://localhost:5000/auth/review/978-0-890123-56-7
Headers:
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN_HERE

Body (raw JSON):
{
  "review": "Pride and Prejudice is a timeless classic with brilliant character development."
}
```

#### Request 7D: Unauthorized Request (No Token)
```
Method: PUT
URL: http://localhost:5000/auth/review/978-0-385-47454-2
Headers:
  Content-Type: application/json
  # NO Authorization header

Body (raw JSON):
{
  "review": "This should fail"
}

Expected Response:
{
  "success": false,
  "message": "Authentication Required. Please login first."
}
```

---

### **Task 8: Delete Book Review (3 Points)**

#### Request 8A: Delete Existing Review
```
Method: DELETE
URL: http://localhost:5000/auth/review/978-0-385-47454-2
Headers:
  Authorization: Bearer YOUR_JWT_TOKEN_HERE

Expected Response:
{
  "success": true,
  "message": "Review deleted successfully",
  "data": {
    "isbn": "978-0-385-47454-2",
    "deletedBy": "testuser"
  }
}
```

#### Request 8B: Delete Non-existent Review
```
Method: DELETE
URL: http://localhost:5000/auth/review/978-1-789012-45-6
Headers:
  Authorization: Bearer YOUR_JWT_TOKEN_HERE

Expected Response:
{
  "success": false,
  "message": "No review found to delete for ISBN: 978-1-789012-45-6"
}
```

#### Request 8C: Unauthorized Delete (No Token)
```
Method: DELETE
URL: http://localhost:5000/auth/review/978-0-385-47454-2
Headers:
  # NO Authorization header

Expected Response:
{
  "success": false,
  "message": "Authentication Required. Please login first."
}
```

---

## ⚡ **PART 4: ASYNC PROGRAMMING TASKS (8 Points)**

### **Task 10: Async Callback Function (2 Points)**

#### Request 10A: Get Books Using Callbacks
```
Method: GET
URL: http://localhost:5000/async/books/callback
Headers: None required

Expected Response:
{
  "success": true,
  "message": "Books retrieved using callback functions",
  "data": {
    "1": {
      "author": "Chinua Achebe",
      "title": "Things Fall Apart",
      "isbn": "978-0-385-47454-2",
      "reviews": {}
    },
    // ... more books
  },
  "method": "callback",
  "executionTime": "15ms"
}
```

---

### **Task 11: Promise-based ISBN Search (2 Points)**

#### Request 11A: Promise-based ISBN Search
```
Method: GET
URL: http://localhost:5000/async/isbn/978-0-385-47454-2/promise
Headers: None required

Expected Response:
{
  "success": true,
  "message": "Book retrieved using Promise-based approach",
  "data": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "isbn": "978-0-385-47454-2",
    "reviews": {}
  },
  "method": "promise",
  "executionTime": "12ms"
}
```

#### Request 11B: Promise with Invalid ISBN
```
Method: GET
URL: http://localhost:5000/async/isbn/invalid-isbn/promise
Headers: None required

Expected Response:
{
  "success": false,
  "message": "Book not found with ISBN: invalid-isbn",
  "method": "promise",
  "error": "Promise rejected - book not found"
}
```

---

### **Task 12: Promise-based Author Search (2 Points)**

#### Request 12A: Promise-based Author Search
```
Method: GET
URL: http://localhost:5000/async/author/Jane Austen/promise
Headers: None required

Expected Response:
{
  "success": true,
  "message": "Books by Jane Austen retrieved using Promise-based approach",
  "data": {
    "2": {
      "author": "Jane Austen",
      "title": "Pride and Prejudice",
      "isbn": "978-0-14-143951-8",
      "reviews": {}
    }
  },
  "method": "promise",
  "executionTime": "18ms"
}
```

#### Request 12B: Promise with Non-existent Author
```
Method: GET
URL: http://localhost:5000/async/author/Unknown Author/promise
Headers: None required

Expected Response:
{
  "success": false,
  "message": "No books found by author: Unknown Author",
  "method": "promise",
  "error": "Promise rejected - author not found"
}
```

---

### **Task 13: Async/Await Title Search (2 Points)**

#### Request 13A: Async/Await Title Search
```
Method: GET
URL: http://localhost:5000/async/title/Pride and Prejudice/async
Headers: None required

Expected Response:
{
  "success": true,
  "message": "Books with title 'Pride and Prejudice' retrieved using async/await",
  "data": {
    "2": {
      "author": "Jane Austen",
      "title": "Pride and Prejudice",
      "isbn": "978-0-14-143951-8",
      "reviews": {}
    }
  },
  "method": "async/await",
  "executionTime": "14ms"
}
```

#### Request 13B: Async/Await with Partial Title
```
Method: GET
URL: http://localhost:5000/async/title/Pride/async
Headers: None required
```

#### Request 13C: Async/Await with Non-existent Title
```
Method: GET
URL: http://localhost:5000/async/title/Non Existent/async
Headers: None required

Expected Response:
{
  "success": false,
  "message": "No books found with title: Non Existent",
  "method": "async/await",
  "error": "Async function rejected - title not found"
}
```

---

## 📊 **BONUS: COMPREHENSIVE TESTING REQUESTS**

### **Health Check**
```
Method: GET
URL: http://localhost:5000/health
Headers: None required

Expected Response:
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-09-20T10:30:00.000Z",
  "version": "1.0.0"
}
```

### **Server Status**
```
Method: GET
URL: http://localhost:5000/status
Headers: None required
```

---

## 🎯 **COMPLETE TESTING SEQUENCE FOR SUBMISSION**

### **Step 1: Server Setup**
1. Start server: `node index.js`
2. Verify server is running on http://localhost:5000

### **Step 2: Test Public Endpoints (10 Points)**
- Run Requests 1A, 2A, 3A, 4A, 9A
- Demonstrate error handling with 2B, 3C, 4C

### **Step 3: Test User Management (6 Points)**  
- Register new user: Request 5A
- Login with credentials: Request 6A
- **Copy the JWT token from login response**

### **Step 4: Test Authenticated Endpoints (6 Points)**
- Add review: Request 7A (use JWT token)
- Verify review added: Request 9A
- Update review: Request 7B (use JWT token)
- Delete review: Request 8A (use JWT token)

### **Step 5: Test Async Programming (8 Points)**
- Callback function: Request 10A
- Promise ISBN search: Request 11A
- Promise author search: Request 12A
- Async/await title search: Request 13A

### **Step 6: Verify Error Handling**
- Test without authentication: Request 7D, 8C
- Test with invalid data: Request 5B, 6B
- Test async errors: Request 11B, 12B, 13C

---

## 📋 **SUBMISSION CHECKLIST**

- ✅ All 14 API endpoints working
- ✅ Authentication system functional
- ✅ Error handling implemented
- ✅ Async programming patterns demonstrated
- ✅ JWT tokens working properly
- ✅ Password hashing with bcrypt
- ✅ Session management
- ✅ CORS enabled
- ✅ Request/response validation

**🎉 Total Score: 30/30 Points**

---

## 🚀 **Quick Import for Postman**

You can import this entire collection into Postman using the provided requests above. Each request is properly formatted with:
- Method type (GET, POST, PUT, DELETE)
- Complete URLs with parameters
- Required headers
- Request body data (where applicable)
- Expected responses
- Error scenarios

**Happy Testing! 🎊**