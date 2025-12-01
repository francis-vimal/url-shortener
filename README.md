
# URL Shortener (React + Node.js + Express + PostgreSQL)

This is a simple and efficient **URL Shortener** built using **React**, **Node.js**, **Express**, and **PostgreSQL**, and deployed on **Render**.  
It allows users to shorten long URLs, fetch original URLs using short codes, and track view statistics.

---

## 🚀 Live URL
Application is deployed on Render:

```
https://url-shortener-frontend-ewoh.onrender.com/
```

---

## 📌 Features

- Shorten long URLs into simple short codes  
- Redirect users to the original URL using the short code  
- Track statistics such as:
  - Total views  
  - Last visited timestamp  
- REST API structure for easy integration with any frontend  
- PostgreSQL database hosted on Render  

---

## 🛠️ Tech Stack

- **React**
- **Node.js**
- **Express.js**
- **PostgreSQL (Render PostgreSQL Instance)**
- **Render** (for hosting server + DB)

---

## 📁 Project Structure

```
.
├── src
│   ├── controllers
│   ├── routes
│   └── app.js
├── package.json
└── README.md
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/francis-vimal/url-shortener.git
cd url-shortener
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file:

```
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<dbname>
BASE_URL=<YOUR_BASE_URL>
VITE_BACKEND_URL=<YOUR_VITE_BACKEND_URL>
```

### 4️⃣ Start the Server

```bash
node src/server.js
```

### 5️⃣ Start the Frontend Server

```bash
npm run dev
```

---

## 🌐 Deployment (Render)

This project is deployed on Render using:

- **Render Static** → React frontend
- **Render Web Service** → Node.js backend  
- **Render PostgreSQL** → Database  

---

## 📄 License
This project is open-source and free to modify.

---

## 🙌 Author
Built by Vimal Arul Francis.
