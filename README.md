<div align="center">

# GoGo Rental

**Car Rental Booking Platform**

[![Live Demo](https://img.shields.io/badge/Live_Demo-gogorental.vercel.app-4F46E5?style=for-the-badge)](https://gogorental.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)

[Live Application](https://gogorental.vercel.app/) &nbsp;|&nbsp; [Report an Issue](../../issues) &nbsp;|&nbsp; [Request a Feature](../../issues)

</div>

---

## Overview

GoGo Rental is a full-stack web application for car rental booking. Users can browse rental providers, view available vehicles, select a rental period, and complete a booking through a streamlined interface. The platform supports role-based access control, providing distinct experiences for regular users and administrators.

---

## Features

### User

- Register and log in with secure JWT-based authentication via NextAuth
- Browse rental providers and view their available vehicle fleet
- Select a rental period using an interactive date range picker
- View, modify, and cancel personal bookings

### Administrator

- Manage all rental providers (create, edit, delete)
- Manage vehicles across all providers
- View and oversee all bookings on the platform

### Security

- JWT authentication stored in HTTP-only cookies
- Password hashing using bcrypt
- XSS attack prevention via express-xss-sanitizer
- NoSQL injection sanitization via express-mongo-sanitize
- Security headers enforced via Helmet
- HTTP parameter pollution prevention via HPP

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework with SSR and SSG support |
| TypeScript | Static typing across all components |
| Tailwind CSS v4 | Utility-first styling |
| NextAuth.js | Authentication and session management |
| Redux Toolkit | Global client-side state management |
| Redux Persist | State persistence across sessions |

### Backend

| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database and object document mapper |
| JSON Web Token (JWT) | Token-based authentication |
| bcryptjs | Password hashing |
| Helmet / HPP / XSS Sanitizer | Security middleware |

### Deployment

| Service | Role |
|---|---|
| Vercel | Frontend and backend hosting |

---

## Project Structure

```
.
├── Backend/
│   ├── config/             # Database connection configuration
│   ├── controllers/        # Route handler logic (auth, cars, providers, rentals)
│   ├── middleware/         # Authentication guard middleware
│   ├── models/             # Mongoose schemas (User, Car, Provider, Rental)
│   ├── routes/             # Express route definitions
│   └── server.js           # Application entry point
│
└── frontend/
    └── src/
        ├── app/
        │   ├── admin/          # Admin dashboard (cars, providers, rentals)
        │   ├── login/          # Login page
        │   ├── register/       # Registration page
        │   ├── providers/      # Provider listing and detail pages
        │   ├── rentals/        # User rental management pages
        │   └── api/            # Next.js API routes proxying to backend
        └── components/
            ├── TopMenu.tsx         # Navigation bar with authentication state
            ├── HeroButtons.tsx     # Landing page call-to-action
            └── ui/                 # Reusable UI components
```

---

## API Reference

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Authenticate and receive a JWT |
| `GET` | `/api/auth/logout` | Private | Invalidate the current session |
| `GET` | `/api/auth/me` | Private | Get the current authenticated user |

### Providers

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/providers` | Public | Retrieve all providers |
| `GET` | `/api/providers/:id` | Public | Retrieve a single provider |
| `POST` | `/api/providers` | Admin | Create a new provider |
| `PUT` | `/api/providers/:id` | Admin | Update a provider |
| `DELETE` | `/api/providers/:id` | Admin | Delete a provider |

### Cars

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/cars` | Public | Retrieve all cars |
| `GET` | `/api/cars/:id` | Public | Retrieve a single car |
| `POST` | `/api/cars` | Admin | Add a new car |
| `PUT` | `/api/cars/:id` | Admin | Update a car |
| `DELETE` | `/api/cars/:id` | Admin | Delete a car |

### Rentals

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/rentals` | Private | Retrieve rentals (own for users, all for admins) |
| `GET` | `/api/rentals/:id` | Private | Retrieve a single rental |
| `POST` | `/api/rentals` | Private | Create a new rental |
| `PUT` | `/api/rentals/:id` | Private | Update a rental |
| `DELETE` | `/api/rentals/:id` | Private | Cancel a rental |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- A MongoDB connection URI (local instance or MongoDB Atlas)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

**2. Configure and run the backend**

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

**3. Configure and run the frontend**

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
BACKEND_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## License

This project is licensed under the ISC License.
