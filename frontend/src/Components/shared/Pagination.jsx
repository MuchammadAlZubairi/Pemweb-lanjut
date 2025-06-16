const Pagination = ({ pages, page, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-2">
      {[...Array(pages).keys()].map((x) => (
        <button
          key={x + 1}
          onClick={() => onPageChange(x + 1)}
          className={`px-3 py-1 rounded-md ${
            x + 1 === page
              ? "bg-primary-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {x + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;