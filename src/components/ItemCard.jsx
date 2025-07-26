import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <div className="bg-gray-100 rounded-2xl shadow-xl hover:shadow-gray-700 ease-in-out transition-shadow duration-300 overflow-hidden flex flex-col">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
        onError={(e) => (e.target.src = "https://via.placeholder.com/400x300")}
      />

      <div className="p-4 flex flex-col justify-between h-full">
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h2>
          <p className="text-sm text-gray-500 mb-1">
            <span className="font-medium">Category:</span> {item.category}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            <span className="font-medium">Owner:</span> {item.owner}
          </p>
          <p className="text-sm">
            <span className="font-medium">Status:</span>{" "}
            <span className={item.available ? "text-green-600" : "text-red-600"}>
              {item.available ? "Available" : "Sold"}
            </span>
          </p>
        </div>

        <div className="mt-4">
          <Link
            to={`/item/${item.id}`}
            className="inline-block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
