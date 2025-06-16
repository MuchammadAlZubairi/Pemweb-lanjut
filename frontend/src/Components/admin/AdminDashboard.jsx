// File: src/Components/admin/AdminDashboard.jsx

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState({ users: 0, products: 0, categories: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [usersRes, productsRes, categoriesRes] = await Promise.all([
          axios.get("/api/users"),
          axios.get("/api/products"),
          axios.get("/api/categories")
        ]);

        setSummary({
          users: usersRes.data.length,
          products: productsRes.data.length,
          categories: categoriesRes.data.length
        });
      } catch (err) {
        console.error("Failed to load dashboard summary", err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="space-y-8 p-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Welcome back, {user?.username}!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          You are logged in as an administrator.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/products"
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Manage Products
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View, add, edit, and delete products
          </p>
        </Link>

        <Link
          to="/admin/categories"
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Manage Categories
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View, add, edit, and delete categories
          </p>
        </Link>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Quick Stats
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Users
              </p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {summary.users}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Products
              </p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {summary.products}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Categories
              </p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {summary.categories}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
