# 🛕 Darshan Ease — Temple Ticket Booking App

A MERN stack app to book darshan tickets for temples in Andhra Pradesh & Telangana.

## Tech Stack
- **Frontend**: React, React Router, Axios, React Toastify
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT (JSON Web Tokens) + bcrypt

---

## Project Structure

```
darshan-ease/
├── backend/
│   ├── config/db.js          ← MongoDB connection
│   ├── models/
│   │   ├── User.js           ← User schema
│   │   ├── Temple.js         ← Temple schema
│   │   └── Booking.js        ← Booking schema
│   ├── routes/
│   │   ├── authRoutes.js     ← /api/auth (register, login)
│   │   ├── templeRoutes.js   ← /api/temples
│   │   └── bookingRoutes.js  ← /api/bookings
│   ├── middleware/
│   │   └── authMiddleware.js ← JWT protection
│   ├── seed.js               ← Seed 6 temples into DB
│   ├── server.js             ← Express server entry
│   ├── .env                  ← Environment variables
│   └── package.json
│
└── frontend/
    ├── public/index.html
    ├── src/
    │   ├── api.js                    ← All API calls
    │   ├── App.js                    ← Routes
    │   ├── index.js                  ← React entry
    │   ├── context/AuthContext.js    ← Global login state
    │   ├── components/Navbar.js
    │   └── pages/
    │       ├── Home.js         ← Landing + temple cards
    │       ├── Temples.js      ← All temples + search
    │       ├── BookTicket.js   ← Booking form + summary
    │       ├── MyBookings.js   ← User's bookings
    │       ├── Login.js
    │       └── Register.js
    └── package.json
```

---

## Setup Instructions

### Step 1 — Install MongoDB
Download from https://www.mongodb.com/try/download/community and start it.

### Step 2 — Setup Backend
```bash
cd backend
npm install
node seed.js      # This adds 6 temples to your database
npm run dev       # Server starts on http://localhost:5000
```

### Step 3 — Setup Frontend
```bash
cd frontend
npm install
npm start         # React app starts on http://localhost:3000
```

### Step 4 — Open App
Visit http://localhost:3000 in your browser.

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/temples | Get all temples |
| GET | /api/temples/:id | Get single temple |
| POST | /api/bookings | Create booking (auth required) |
| GET | /api/bookings/my | Get my bookings (auth required) |
| PUT | /api/bookings/:id/cancel | Cancel booking (auth required) |

---

## Features
- Register / Login with JWT auth
- Browse 6 temples (Tirupati, Srisailam, Kanaka Durga, Yadagirigutta, Bhadrachalam, Annavaram)
- Search temples by name or city
- Book darshan tickets with date, time slot, pooja type
- Live price calculator (ticket + pooja + service charge)
- View & cancel your bookings
- Full slot blocking (capacity based)

---
Made with ❤️ for Darshan Ease — SkillWallet MERN Project
