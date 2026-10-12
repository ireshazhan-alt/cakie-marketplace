# Cakie Marketplace

A full-stack marketplace application for custom cakes, built with a React + TypeScript frontend and an Express + MongoDB backend. The app supports customer ordering, seller onboarding, product management, and admin oversight.

## Overview

Cakie Marketplace enables three user roles:

- Customer: browse cakes, place orders, track purchase history
- Seller: manage cake listings, manage assigned orders, onboard as a seller
- Admin: manage users and oversee marketplace operations

The repository is split into two main parts:

- `cakie-frontend/` — Vite + React + TypeScript client
- `cakie-backend/` — Express API server with Mongoose and JWT auth

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Radix UI primitives

### Backend
- Node.js
- Express 5
- MongoDB via Mongoose
- JWT authentication
- bcryptjs
- dotenv
- CORS

## Repository Structure

```bash
cakie-marketplace/
├── README.md
├── package.json
├── package-lock.json
├── cakie-backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── modules/
│   │   ├── users/
│   │   ├── cakes/
│   │   ├── sellers/
│   │   └── orders/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── .env
├── cakie-frontend/
│   ├── public/
│   ├── src/
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   └── .gitignore
└── .gitignore
```

## Prerequisites

- Node.js 18+
- npm
- MongoDB instance or MongoDB Atlas connection string

## Environment Configuration

### Backend
Create a `.env` file in `cakie-backend/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/cakie-marketplace
JWT_SECRET=your_secure_jwt_secret
```

## Installation

### 1. Install backend dependencies

```bash
cd cakie-backend
npm install
```

### 2. Install frontend dependencies

```bash
cd ../cakie-frontend
npm install
```

## Running the Application

### Start the backend

```bash
cd cakie-backend
npm run dev
```

This starts the Express API on:

```bash
http://localhost:5000
```

### Start the frontend

```bash
cd cakie-frontend
npm run dev
```

This starts the Vite dev server on:

```bash
http://localhost:5173
```

## Backend API

The Express app mounts route modules in `server.js`:

```js
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cakes", cakeRoutes);
app.use("/api/sellers", sellerRoutes);
```

### Route Modules

- `cakie-backend/modules/users/` — authentication, profile, and account management
- `cakie-backend/modules/cakes/` — cake listing CRUD logic
- `cakie-backend/modules/orders/` — customer and seller order management
- `cakie-backend/modules/sellers/` — seller onboarding and seller data management

### Database Connection

Database connectivity is configured in:

```js
cakie-backend/config/db.js
```

It uses `mongoose.connect(process.env.MONGO_URI)` and exits the process if the connection fails.

## Frontend Application Structure

The frontend uses a route-based structure in `src/App.tsx`:

- Public routes:
  - `/`
  - `/login`
  - `/register`
  - `/cakes/:id`
  - `/sellers/:id`
- Protected routes:
  - `/profile`
  - `/my-orders`
  - `/orders/:id`
  - `/place-order`
  - `/seller-onboarding`
  - `/admin-dashboard`
  - `/manage-users`
  - `/manage-orders`
  - `/seller-dashboard`
  - `/manage-cakes`
  - `/add-cake`
  - `/edit-cake/:id`

## Role-Based Access Model

### Customer
- Browse cakes and seller profiles
- Place and view orders
- Access personal account pages

### Seller
- View seller dashboard
- Add/edit cake listings
- Manage orders linked to seller products
- Complete seller onboarding flow

### Admin
- Access administrative dashboards
- Manage marketplace users and orders
- Control higher-level business operations

## Authentication Design

The backend uses JSON Web Tokens and middleware for protected endpoints. The project contains:

```bash
cakie-backend/middleware/authMiddleware.js
```

This middleware is designed to validate tokens and authorize protected resources for authenticated users.

## Notes for Developers

- The frontend is built with component-driven architecture under `cakie-frontend/src/components/`.
- Styling is handled with Tailwind and reusable UI components under `src/components/ui/`.
- The backend uses modular route and model organization under `modules/` for maintainability.
- The application is currently in a marketplace/prototype stage and is structured to support scalable extension.

## Common Commands

### Backend

```bash
cd cakie-backend
npm install
npm run dev
```

### Frontend

```bash
cd cakie-frontend
npm install
npm run dev
npm run build
```

## Production Notes

Before deploying:

- configure a real MongoDB URI
- set secure JWT secrets
- set environment-specific CORS policies
- build the frontend using `npm run build`
- serve the frontend and backend through a deployment platform or reverse proxy

## License

No explicit license file is present in the repository metadata at this time.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Commit and push your branch
5. Open a pull request for review

## Contact

Repository owner: `ireshazhan-alt`
Project: `cakie-marketplace`
