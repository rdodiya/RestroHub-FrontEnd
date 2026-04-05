// src/routes/index.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import CustomerLayout from '../layouts/CustomerLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from '@context/AuthContext';

// Public Pages
import Landing from '@pages/public/Landing';
import Login from '@pages/public/Login';
import Unauthorized from '@pages/public/Unauthorized';

// Customer Pages
import RestaurantMenu from '../pages/customer/RestaurantMenu';

// Admin Pages
import Dashboard from '@components/admin/dashboard/Dashboard';
import Menus from '@components/admin/menu/Menus';
import Orders from '@components/admin/orders/Orders';
import Branches from '@components/admin/store/branch/Branches';
import Tables from '@components/admin/store/tables/Tables';
import Website from '@components/admin/marketing/website/Website';
import QRDisplay from '@components/admin/marketing/qr/QRDisplay';
import UPILinks from '@components/admin/upi/UPILinks';
import Profile from '@components/admin/profile/Profile';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>

        {/* ========= PUBLIC ROUTES ========= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        {/* ========= CUSTOMER ROUTES ========= */}
        <Route element={<CustomerLayout />}>
          <Route
            path="/Restrohub/:restaurantName/:branchId"
            element={<RestaurantMenu />}
          />
        </Route>

        {/* ========= ADMIN ROUTES (ADMIN ONLY) ========= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="menus" element={<Menus />} />
          <Route path="orders" element={<Orders />} />
          <Route path="store/branches" element={<Branches />} />
          <Route path="store/branches/:branchId/tables" element={<Tables />} />
          <Route path="marketing/website" element={<Website />} />
          <Route path="marketing/qr-display" element={<QRDisplay />} />
          <Route path="upi-links" element={<UPILinks />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* ========= 404 ========= */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;