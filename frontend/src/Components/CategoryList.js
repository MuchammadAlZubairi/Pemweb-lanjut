import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/categories");
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/categories/${id}`);
      toast.success("Category deleted successfully");
      getCategories();
    } catch (err) {
      toast.error("Failed to delete category");
    }
  };

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <TagIcon className="h-6 w-6" />
            Category List
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage all your product categories here
          </p>
        </div>
        <Link to="/categories/add" className="btn-primary inline-flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          Add Category
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            className="w-full pl-10"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="w-16">No</th>
              <th>Name</th>
              <th>Description</th>
              <th className="w-36">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-8">
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              filtered.map((cat, index) => (
                <tr key={cat.id}>
                  <td>{index + 1}</td>
                  <td>{cat.name}</td>
                  <td>{cat.description}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/categories/edit/${cat.id}`}
                      className="btn-success flex items-center justify-center"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedId(cat.id);
                        setModalOpen(true);
                      }}
                      className="btn-danger flex items-center justify-center"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this category?"
          onConfirm={() => {
            deleteCategory(selectedId);
            setModalOpen(false);
          }}
          onCancel={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CategoryList;