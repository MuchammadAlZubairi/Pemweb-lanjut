import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center space-x-2"
            >
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                Pasar Online
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                }`
              }
            >
              Home
            </NavLink>

            {user?.role === "admin" && (
              <>
                <NavLink
                  to="/admin/products"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    }`
                  }
                >
                  Products
                </NavLink>
                <NavLink
                  to="/admin/categories"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    }`
                  }
                >
                  Categories
                </NavLink>
              </>
            )}

            <DarkModeToggle />

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Hi, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                }`
              }
            >
              Home
            </NavLink>

            {user?.role === "admin" && (
              <>
                <NavLink
                  to="/admin/products"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    }`
                  }
                >
                  Products
                </NavLink>
                <NavLink
                  to="/admin/categories"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    }`
                  }
                >
                  Categories
                </NavLink>
              </>
            )}

            <div className="px-3 py-2">
              <DarkModeToggle />
            </div>

            {user ? (
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center px-5">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Hi, {user.name}
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-1">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;