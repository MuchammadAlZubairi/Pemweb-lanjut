import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import {
  CreditCardIcon,
  TruckIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

const PlaceOrderScreen = () => {
  const {
    cart,
    shippingAddress,
    paymentMethod,
    clearCart,
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const itemsPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = itemsPrice * 0.15;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrder = async () => {
    try {
      setLoading(true);
      const orderItems = cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const { data } = await axios.post("/orders", {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      clearCart();
      navigate(`/order/${data.id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [paymentMethod, navigate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Shipping
          </h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <HomeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-gray-700 dark:text-gray-300">
                Address: {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </span>
            </div>
            <button
              onClick={() => navigate("/shipping")}
              className="text-sm text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Payment Method
          </h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <CreditCardIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-gray-700 dark:text-gray-300">
                Method: {paymentMethod}
              </span>
            </div>
            <button
              onClick={() => navigate("/payment")}
              className="text-sm text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Order Items
          </h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center overflow-hidden">
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        No Image
                      </span>
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {item.product.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Qty: {item.quantity}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Order Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Items</span>
              <span className="text-gray-900 dark:text-gray-100">
                ${itemsPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Shipping</span>
              <span className="text-gray-900 dark:text-gray-100">
                ${shippingPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Tax</span>
              <span className="text-gray-900 dark:text-gray-100">
                ${taxPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
              <span className="font-bold text-gray-900 dark:text-gray-100">
                Total
              </span>
              <span className="font-bold text-gray-900 dark:text-gray-100">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading || cart.length === 0}
            className={`w-full mt-6 py-2 px-4 rounded-md font-medium ${
              loading || cart.length === 0
                ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                : "bg-primary-600 hover:bg-primary-700 text-white"
            }`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;