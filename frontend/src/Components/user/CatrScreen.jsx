import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  TrashIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const CartScreen = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    shippingAddress,
    saveShippingAddress,
  } = useAuth();
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    navigate("/payment");
  };

  const itemsPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = itemsPrice * 0.15;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="alert alert-info">
            <p>Your cart is empty</p>
            <Link
              to="/"
              className="btn btn-outline mt-2 inline-flex items-center"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Go Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {cart.map((item) => (
                    <tr key={item.product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {item.product.image ? (
                              <img
                                className="h-10 w-10 rounded"
                                src={item.product.image}
                                alt={item.product.name}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                <span className="text-xs text-gray-500 dark:text-gray-300">
                                  No Image
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {item.product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          ${item.product.price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            addToCart(item.product, Number(e.target.value))
                          }
                          className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1"
                        >
                          {[...Array(item.product.stock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          ${(item.product.price * item.quantity).toFixed(2)}