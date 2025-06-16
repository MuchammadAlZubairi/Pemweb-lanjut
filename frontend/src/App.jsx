import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./Components/shared/Layout";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import AdminDashboard from "./Components/admin/AdminDashboard";
import AdminProducts from "./Components/admin/AdminProducts";
import AdminCategories from "./Components/admin/AdminCategories";
import ProductList from "./Components/user/ProductList";
import ProductDetail from "./Components/user/ProductDetail";
import CartScreen from "./Components/user/CartScreen";
import ShippingScreen from "./Components/user/ShippingScreen";
import PaymentScreen from "./Components/user/PaymentScreen";
import PlaceOrderScreen from "./Components/user/PlaceOrderScreen";
import OrderScreen from "./Components/user/OrderScreen";
import UserProfile from "./Components/user/UserProfile";
import PrivateRoute from "./Components/shared/PrivateRoute";
import AdminRoute from "./Components/shared/AdminRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartScreen />} />

            {/* Private Routes */}
            <Route
              path="/shipping"
              element={
                <PrivateRoute>
                  <ShippingScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <PrivateRoute>
                  <PaymentScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/placeorder"
              element={
                <PrivateRoute>
                  <PlaceOrderScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/order/:id"
              element={
                <PrivateRoute>
                  <OrderScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <AdminProducts />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <AdminCategories />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthProvider>
  );
}

export default App;