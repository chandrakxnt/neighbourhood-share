import { useEffect, useState } from "react";
import mockItems from "../data/mockItems";
import ItemCard from "../components/ItemCard";

const MyRequests = () => {
  const [requestedItems, setRequestedItems] = useState([]);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) return;

    const localItems = JSON.parse(localStorage.getItem("userItems")) || [];

    // Merge mock items and user-added items (mock items won't have borrowedBy in localStorage unless cloned)
    const combinedItems = [...mockItems, ...localItems];

    const filtered = combinedItems.filter(
      (item) => item.borrowedBy === currentUser
    );

    setRequestedItems(filtered);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📦 My Borrow Requests</h2>

      {requestedItems.length === 0 ? (
        <p className="text-gray-600 text-lg">
          You haven't requested to borrow any items yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {requestedItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
