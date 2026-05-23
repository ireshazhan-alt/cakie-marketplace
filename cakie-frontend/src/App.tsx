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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;