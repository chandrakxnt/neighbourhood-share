import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const allItems = JSON.parse(localStorage.getItem("userItems")) || [];
    const filtered = allItems.filter((item) => item.owner === currentUser);
    setUserItems(filtered);
  }, [currentUser, navigate]);

  const handleDelete = (id) => {
    const allItems = JSON.parse(localStorage.getItem("userItems")) || [];
    const updated = allItems.filter((item) => item.id !== id);
    localStorage.setItem("userItems", JSON.stringify(updated));
    setUserItems(updated.filter((item) => item.owner === currentUser));
  };

const handleMarkAsSold = (id) => {
  const allItems = JSON.parse(localStorage.getItem("userItems")) || [];
  const updated = allItems.map((item) =>
    item.id === id ? { ...item, sold: true, available: false } : item
  );
  localStorage.setItem("userItems", JSON.stringify(updated));
  setUserItems(updated.filter((item) => item.owner === currentUser));
};



  return (
    <div className="p-6">
      
      <h2 className="text-2xl font-bold mb-4">Welcome, {currentUser}</h2>
      <div className="mb-4 flex gap-4">

 <button
            onClick={() => {navigate("/add-item");}
            }
            className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
          >
            + Add Item
          </button>


           <button
            onClick={() => {navigate("/");}
            }
            className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
          >
            Home
          </button>
      </div>

             

      {userItems.length === 0 ? (
        <p className="text-gray-600">No items added yet.</p>
        
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userItems.map((item) => (
            <div key={item.id} className="bg-white rounded shadow p-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="font-semibold mt-2">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-sm text-gray-600 mt-1">
                Status: {item.sold ? "Sold" : "Available"}
              </p>

              {!item.sold && (
                <button
                  onClick={() => handleMarkAsSold(item.id)}
                  className="text-green-600 hover:underline mt-2"
                >
                  Mark as Sold
                </button>
              )}
        

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;

