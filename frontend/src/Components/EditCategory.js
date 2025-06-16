import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, CheckIcon, TagIcon } from "@heroicons/react/24/outline";

const EditCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const getCategoryById = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/categories/${id}`);
      setFormData({
        name: res.data.name,
        description: res.data.description || "",
      });
    } catch (err) {
      toast.error("Failed to load category data");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getCategoryById();
  }, [getCategoryById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Category name must be at least 3 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await axios.patch(`http://localhost:5000/categories/${id}`, formData);
      toast.success("Category updated successfully!");
      navigate("/categories");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update category"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TagIcon className="h-6 w-6 text-blue-500" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Category
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Update category details
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/categories")}
            className="btn btn-outline flex items-center gap-1"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              name="name"
              className={`w-full ${errors.name ? "border-red-500" : ""}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Electronics"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              className="w-full"
              value={formData.description}
              onChange={handleChange}
              placeholder="Optional category description..."
            />
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => navigate("/categories")}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-success flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckIcon className="h-5 w-5" />
                    Update Category
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;