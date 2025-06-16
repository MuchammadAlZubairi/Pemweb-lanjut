import Rating from "./Rating";
const ReviewList = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 dark:text-gray-100">
              {review.user.name}
            </h4>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="mt-2">
            <Rating value={review.rating} />
          </div>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;