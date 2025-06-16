import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState(
    localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {}
  );
  const [paymentMethod, setPaymentMethod] = useState(
    localStorage.getItem("paymentMethod") || ""
  );
  const navigate = useNavigate();

  // Set axios defaults
  axios.defaults.baseURL = "http://localhost:5000/api";
  axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";

  // Check if user is authenticated
  const checkAuth = async () => {
    try {
      if (token) {
        const { data } = await axios.get("/auth/me");
        setUser(data);
      }
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [token]);

  // Register user
  const register = async (formData) => {
    try {
      const { data } = await axios.post("/auth/register", formData);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const { data } = await axios.post("/auth/login", formData);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Cart functions
  const addToCart = (product, quantity) => {
    const existItem = cart.find((x) => x.product.id === product.id);
    
    if (existItem) {
      setCart(
        cart.map((x) =>
          x.product.id === product.id ? { ...x, quantity } : x
        )
      );
    } else {
      setCart([...cart, { product, quantity }]);
    }
    
    toast.success("Product added to cart");
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((x) => x.product.id !== id));
    toast.success("Product removed from cart");
  };

  const saveShippingAddress = (data) => {
    setShippingAddress(data);
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };

  const savePaymentMethod = (method) => {
    setPaymentMethod(method);
    localStorage.setItem("paymentMethod", method);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        cart,
        shippingAddress,
        paymentMethod,
        register,
        login,
        logout,
        addToCart,
        removeFromCart,
        saveShippingAddress,
        savePaymentMethod,
        clearCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);