import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function ConfirmationModal({ onClose, onConfirm, message }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
        <div className="flex flex-col items-center text-center">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 sm:mx-0 sm:h-10 sm:w-10 mb-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-2">
            Confirm Action
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {message}
            </p>
          </div>
        </div>
        <div className="mt-5 sm:mt-6 flex justify-center space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn btn-danger px-4 py-2 text-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}