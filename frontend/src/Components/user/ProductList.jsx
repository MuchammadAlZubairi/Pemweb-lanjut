import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { StarIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Pagination from "../shared/Pagination";
import SearchBox from "../shared/SearchBox";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const { addToCart } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `/products?page=${page}`;
        if (keyword) url += `&keyword=${keyword}`;
        if (category) url += `&category=${category}`;

        const { data } = await axios.get(url);
        setProducts(data.products);
        setPages(data.pages);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/categories");
        setCategories(data);
      } catch (err) {
        toast.error("Failed to fetch categories");
      }
    };

    fetchProducts();
    fetchCategories();
  }, [page, keyword, category]);

  const handleSearch = (searchTerm) => {
    setKeyword(searchTerm);
    setPage(1);
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Products
        </h1>
        <SearchBox onSearch={handleSearch} />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
            <h3 className="font-medium text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCategory("")}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    !category
                      ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  All Products
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      category === cat.id
                        ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        No Image
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-5 w-5 ${
                            star <= product.rating
                              ? "text-yellow-400"
                              : "text-gray-300 dark:text-gray-500"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      ({product.numReviews})
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      <ShoppingCartIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pages > 1 && (
            <div className="mt-8">
              <Pagination
                pages={pages}
                page={page}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;