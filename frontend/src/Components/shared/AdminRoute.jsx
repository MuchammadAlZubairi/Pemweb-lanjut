import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  return user?.role === "admin" ? children : <Navigate to="/" replace />;
};

export default AdminRoute;