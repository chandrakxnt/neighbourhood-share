import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <div className="bg-gray-100 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl ease-in-out transition-shadow duration-300 overflow-hidden flex flex-col w-full max-w-sm mx-auto">
      <div className="relative w-full">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-32 sm:h-40 md:h-48 object-cover"
          onError={(e) => (e.target.src = "https://via.placeholder.com/400x300")}
        />
      </div>

      <div className="p-3 sm:p-4 flex flex-col justify-between h-full flex-grow">
        <div className="flex-grow">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2 leading-tight">
            {item.name}
          </h2>
          
          <div className="space-y-1 mb-3">
            <p className="text-xs sm:text-sm text-gray-600">
              <span className="font-medium text-gray-700">Category:</span> 
              <span className="ml-1">{item.category}</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              <span className="font-medium text-gray-700">Owner:</span> 
              <span className="ml-1">{item.owner}</span>
            </p>
            <p className="text-xs sm:text-sm">
              <span className="font-medium text-gray-700">Status:</span>{" "}
              <span className={`ml-1 font-medium ${
                item.sold ? "text-red-600" : 
                item.available ? "text-green-600" : "text-orange-600"
              }`}>
                {item.sold ? "Sold" : item.available ? "Available" : "Borrowed"}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-auto pt-2">
          <Link
            to={`/item/${item.id}`}
            className="inline-block w-full text-center bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm sm:text-base font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;