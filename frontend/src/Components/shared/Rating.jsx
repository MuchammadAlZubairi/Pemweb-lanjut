import { StarIcon } from "@heroicons/react/24/outline";

const Rating = ({ value }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`h-5 w-5 ${
            star <= value ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"
          }`}
        />
      ))}
    </div>
  );
};

export default Rating;