import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  CreditCardIcon,
  BanknotesIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const PaymentScreen = () => {
  const { savePaymentMethod, paymentMethod } = useAuth();
  const [method, setMethod] = useState(paymentMethod || "PayPal");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    savePaymentMethod(method);
    navigate("/placeorder");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Payment Method
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="paypal"
              name="paymentMethod"
              type="radio"
              value="PayPal"
              checked={method === "PayPal"}
              onChange={(e) => setMethod(e.target.value)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <label
              htmlFor="paypal"
              className="ml-3 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <BanknotesIcon className="h-5 w-5 mr-2" />
              PayPal or Credit Card
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="stripe"
              name="paymentMethod"
              type="radio"
              value="Stripe"
              checked={method === "Stripe"}
              onChange={(e) => setMethod(e.target.value)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <label
              htmlFor="stripe"
              className="ml-3 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <CreditCardIcon className="h-5 w-5 mr-2" />
              Stripe
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/shipping")}
            className="btn btn-outline inline-flex items-center"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentScreen;
