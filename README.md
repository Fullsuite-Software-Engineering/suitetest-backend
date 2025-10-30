# 🧠 Suit Test App — Backend

The **Suit Test App Backend** is a Node.js and Express-based REST API built to manage **applicant assessments** and **employee training**.  
It provides secure endpoints for creating and managing quizzes, questions, results, departments, and uploaded learning materials — all managed by admin users.

---

## 🚀 Overview

This backend serves as the **core API** for the Suit Test system, which includes:
- **Applicant testing:** Generate test links and store results.
- **Employee training:** Link uploaded reference materials with quizzes.
- **Admin management:** Create quizzes, upload documents, and track performance data.

🧠 Core Functionalities
🧾 Admin Features

Create and manage Departments, Quizzes, and Questions

Upload training documents

Assign quizzes to applicants or employees

Generate test links and view results

👥 Applicant / Employee Features

Access assigned tests

Take quizzes linked to reference materials

View performance results

🧮 Automated Functions

Result scoring

Validation using Zod

Secure route protection via JWT Middleware

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MySQL (via Sequelize ORM) |
| **Validation** | Zod |
| **Authentication** | JWT (JSON Web Token) |
| **Environment Variables** | dotenv |
| **Language** | ES Modules (import/export syntax) |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/suit-test-backend.git
cd suit-test-backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a .env file in the root directory:
```bash
DB_NAME=suit_test_db
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_PORT=3306

JWT_TOKEN=your_jwt_secret
```

📂 Folder Structure
suit-test-backend/
│
├── config/
│   └── db.mjs               # Sequelize database configuration
│
├── models/
│   ├── applicant.model.mjs
│   ├── department.model.mjs
│   ├── quiz.model.mjs
│   ├── questionBank.model.mjs
│   ├── answerOption.model.mjs
│   ├── result.model.mjs
│   ├── bridge.model.mjs
│   ├── testLink.model.mjs
│   └── index.model.mjs      # Associations and model initialization
│
├── controllers/
│   ├── applicant.controller.mjs
│   ├── quiz.controller.mjs
│   ├── result.controller.mjs
│   ├── department.controller.mjs
│   └── ...
│
├── routes/
│   ├── applicant.routes.mjs
│   ├── quiz.routes.mjs
│   ├── result.routes.mjs
│   └── ...
│
├── middleware/
│   └── auth.middleware.mjs  # JWT token verification
│
├── utils/
│   ├── jwt.js
│   ├── zodValidation.js
│   └── responseHandler.js
│
├── .env
├── package.json
└── server.mjs

👨‍💻 Developer

Mark Joseph Abano 
📧 markabanomain@gmail.com
Francis Alex Darang 
📧 francisddarang@gmail.com
Neil Aron Pascual 
📧 neilaronpascual@gmail.com
Jerome Millares 
📧 jmillares0945@gmail.com
Rav Guzman 
📧 ravalbert17@gmail.com

💼 Project: Suit Test App — Backend
