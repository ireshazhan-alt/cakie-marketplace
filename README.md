# Cakie Marketplace

Cakie Marketplace is a full-stack cake ordering and seller management platform where customers can browse cakes, place orders, and track purchases, while sellers can manage their catalog and fulfillment. The project includes role-based access for customers, sellers, and administrators.

## Features

- Browse and view detailed cake listings
- Seller onboarding and seller profiles
- Cake management for sellers (add, edit, remove listings)
- Customer order placement and order tracking
- Seller order management and dashboard views
- Admin dashboard for managing users and orders
- JWT-based authentication and protected routes
- REST API backend with MongoDB
- Responsive frontend built with React, Vite, and Tailwind CSS

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- CORS and dotenv

## Project Structure

```bash
cakie-marketplace/
├── cakie-backend/
│   ├── config/
│   ├── middleware/
│   ├── modules/
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── ...
├── cakie-frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── ...
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- MongoDB instance (local or cloud such as MongoDB Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/ireshazhan-alt/cakie-marketplace.git
cd cakie-marketplace
```

### 2. Setup backend

```bash
cd cakie-backend
npm install
```

Create a `.env` file in `cakie-backend` with the following values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/cakie-marketplace
JWT_SECRET=your_super_secret_key
```

Start the backend:

```bash
npm run dev
```

The backend will run at:

```bash
http://localhost:5000
```

### 3. Setup frontend

Open a new terminal and run:

```bash
cd cakie-frontend
npm install
npm run dev
```

The frontend will run at:

```bash
http://localhost:5173
```

## API Overview

The backend exposes REST endpoints under the following routes:

- `/api/users` — user registration, login, and profile management
- `/api/cakes` — cake listing and management
- `/api/orders` — customer and seller order operations
- `/api/sellers` — seller onboarding and seller-related data

## Roles and Access

### Customer
- Browse cakes
- View cake details
- Place orders
- View personal order history

### Seller
- Register or onboard as a seller
- Add and edit cakes
- Manage orders assigned to their products
- View seller dashboard

### Admin
- Manage users
- Manage orders
- View administrative dashboard
- Access higher-level controls across the platform

## Development Notes

The application is structured as a monorepo-style project with separate frontend and backend folders. The backend handles authentication, database communications, and API logic, while the frontend manages the storefront, dashboards, and user experience.

## License

This project does not currently specify a license in the repository metadata.

## Project Status

This is a working full-stack marketplace prototype focused on cake commerce workflows, seller management, and order handling.

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## Contact

For questions or collaboration opportunities, please contact the repository owner via GitHub.
