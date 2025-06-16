// File: src/App.jsx

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
import PrivateRoute from "./Components/shared/PrivateRoute";
import AdminRoute from "./Components/shared/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Layout />}>
            <Route
              index
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
    </BrowserRouter>
  );
}

export default App;
