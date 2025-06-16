import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  StarIcon,
  ShoppingCartIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Rating from "../shared/Rating";
import ReviewList from "../shared/ReviewList";
import ReviewForm from "./ReviewForm";
import { useAuth } from "../../context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const { user, addToCart } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`/products/${id}/reviews`);
        setReviews(data);
        setReviewLoading(false);
      } catch (err) {
        toast.error("Failed to fetch reviews");
        setReviewLoading(false);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success("Product added to cart");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-gray-500 dark:text-gray-400">
                No Image
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {product.name}
          </h1>

          <div className="flex items-center space-x-2">
            <Rating value={product.rating} />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {product.numReviews} reviews
            </span>
          </div>

          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            ${product.price}
          </div>

          <p className="text-gray-700 dark:text-gray-300">
            {product.description}
          </p>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 dark:text-gray-300">
                Status:
              </span>
              <span
                className={`font-medium ${
                  product.stock > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {product.stock > 0 && (
              <div className="mt-4 flex items-center space-x-4">
                <span className="text-gray-700 dark:text-gray-300">
                  Quantity:
                </span>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1"
                >
                  {[...Array(product.stock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`mt-6 w-full py-2 px-4 rounded-md font-medium ${
                product.stock === 0
                  ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                  : "bg-primary-600 hover:bg-primary-700 text-white"
              }`}
            >
              {product.stock === 0 ? (
                "Out of Stock"
              ) : (
                <>
                  <ShoppingCartIcon className="h-5 w-5 inline mr-2" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Reviews
        </h2>

        {reviewLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No reviews yet</p>
        ) : (
          <ReviewList reviews={reviews} />
        )}

        {user && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              Write a Review
            </h3>
            <ReviewForm productId={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;