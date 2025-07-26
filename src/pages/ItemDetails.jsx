
import { useParams, Link } from "react-router-dom";
import mockItems from "../data/mockItems";

const ItemDetails = () => {
  const { id } = useParams();

  const userItems = JSON.parse(localStorage.getItem("userItems")) || [];


  const allItems = [...mockItems, ...userItems];

  const item = allItems.find((itm) => itm.id === id);
const handleRequest = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    alert("You must be logged in to request.");
    return;
  }


  const userItems = JSON.parse(localStorage.getItem("userItems")) || [];


  const itemIndex = userItems.findIndex((itm) => String(itm.id) === String(item.id));

  let updatedItems = [...userItems];

  if (itemIndex !== -1) {
    // If item already exists in userItems, update it
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      available: false,
      borrowedBy: currentUser,
    };
  } else {
    // If item is from mockItems, add it to userItems with borrowedBy
    const borrowedItem = {
      ...item,
      available: false,
      borrowedBy: currentUser,
    };
    updatedItems.push(borrowedItem);
  }

  // Save back to localStorage
  localStorage.setItem("userItems", JSON.stringify(updatedItems));
  alert("Borrow request submitted successfully!");
  window.location.reload();
};



  if (!item) {
    return (
      <div className="text-red-500 text-xl">
        Item not found. <Link to="/" className="text-blue-600 underline">Go back</Link>
      </div>
    );
  }

  return (
    <div className=" flex justify-center items-center p-4">
      <div className="max-w-3xl mx-auto bg-gray-500 shadow-md p-6 rounded">
        <img src={item.image} alt={item.name} className="w-full h-60 object-cover rounded" />
        <h1 className="text-2xl  font-bold mt-4">{item.name}</h1>
        <p className="text-gray-900 mt-2">{item.description}</p>
        <p className="mt-2"><strong>Category:</strong> {item.category}</p>
        <p><strong>Owner:</strong> {item.owner}</p>
        <p><strong>Condition:</strong> {item.condition}</p>

        <p className="mt-2 font-semibold">
          Status:{" "}
          {item.sold
            ? <span className="text-red-500">Sold</span>
            : item.available
            ? <span className="text-green-300">Available</span>
            : <span className="text-yellow-600">Borrowed</span>}
        </p>

     {item.available && !item.sold && (
  <button
    onClick={handleRequest}
    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Request to Borrow
  </button>
)}


        {!item.available && item.borrowedBy && (
          <p className="mt-2 text-sm text-gray-200">Borrowed by: {item.borrowedBy}</p>
        )}

        <Link to="/" className="block mt-6 text-blue-300 hover:underline">
          ← Back to Catalog
        </Link>
      </div>
    </div>
  );
};

export default ItemDetails;
