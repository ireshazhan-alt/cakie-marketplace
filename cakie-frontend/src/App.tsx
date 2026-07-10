import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import ManageOrders from "./pages/ManageOrders";
import ManageUsers from "./pages/ManageUsers";
import OrderDetails from "./pages/OrderDetails";
import PlaceOrder from "./pages/PlaceOrder";
import AdminDashboard from "./pages/AdminDashboard";

// ← your new pages
import SellerDashboard from "./pages/SellerDashboard";
import ManageCakes from "./pages/ManageCakes";
import AddCake from "./pages/AddCake";
import EditCake from "./pages/EditCake";
import CakeDetails from "./pages/CakeDetails";
import SellerProfile from "./pages/SellerProfile";
import SellerOnboarding from "./pages/SellerOnboarding";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cakes/:id" element={<CakeDetails />} />             {/* public */}
        <Route path="/sellers/:id" element={<SellerProfile />} />         {/* public */}

        {/* Logged-in user routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-orders"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin", "seller"]}>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/place-order"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <PlaceOrder />
            </ProtectedRoute>
          }
        />

        {/* Seller onboarding route */}
        <Route
          path="/seller-onboarding"
          element={
            <ProtectedRoute>
              <SellerOnboarding />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-orders"
          element={
            <ProtectedRoute allowedRoles={["admin", "seller"]}>
              <ManageOrders />
            </ProtectedRoute>
          }
        />

        {/* Seller routes — your new pages */}
        <Route
          path="/seller-dashboard"
          element={
            <ProtectedRoute allowedRoles={["seller", "admin"]}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-cakes"
          element={
            <ProtectedRoute allowedRoles={["seller", "admin"]}>
              <ManageCakes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-cake"
          element={
            <ProtectedRoute allowedRoles={["seller", "admin"]}>
              <AddCake />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-cake/:id"
          element={
            <ProtectedRoute allowedRoles={["seller", "admin"]}>
              <EditCake />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;