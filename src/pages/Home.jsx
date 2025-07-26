import { useState, useEffect } from "react";
import mockItems from "../data/mockItems";
import ItemCard from "../components/ItemCard";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [sort, setSort] = useState("name");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    setCurrentUser(user);
  }, []);

  useEffect(() => {
const loadItems = () => {
  const localItems = JSON.parse(localStorage.getItem("userItems")) || [];

  // Create a map of local items by ID (string-safe)
  const localMap = new Map(localItems.map((item) => [item.id, item]));

  // For each mock item, use updated version from localStorage if available
  const merged = mockItems.map((mock) =>
    localMap.has(mock.id) ? localMap.get(mock.id) : mock
  );

  // Add any local items that do NOT exist in mockItems (e.g., new user-added items)
  const extras = localItems.filter(
    (item) => !mockItems.some((mock) => mock.id === item.id)
  );

  // Final list of merged items
  setItems([...merged, ...extras]);
};



    loadItems();

    // Refresh items whenever tab is focused again (e.g., returning from Profile)
    const handleFocus = () => loadItems();
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const uniqueCategories = ["All"];

  mockItems.forEach((item) => {
    if (item.category && !uniqueCategories.includes(item.category)) {
      uniqueCategories.push(item.category);
    }
  });

  const filteredItems = items
    // Search filter
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))

    // Category filter
    .filter((item) => (category === "All" ? true : item.category === category))

    // Availability filter
    .filter((item) => {
      if (availability === "All") return true;
      if (availability === "Available") return item.available && !item.sold;
      if (availability === "Borrowed") return !item.available && !item.sold;
      if (availability === "Sold") return item.sold === true;
      return true;
    })

    // Sort filter
    .sort((a, b) => a[sort].localeCompare(b[sort]));

  return (
    <div className="  p-6 ">
      <div className="flex justify-between items-center bg-gradient-to-br from-black via-gray-500 to-black p-4 mb-4 rounded-2xl">
        <h1 className="text-2xl font-bold text-white">Items Catalog</h1>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              if (currentUser) {
                navigate("/add-item");
              } else {
                alert("You must be logged in to add an item.");
                navigate("/login");
              }
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Item
          </button>
          <Link
  to="/my-requests"
  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
>
  My Requests
</Link>


          <Link
            to="/map"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Map
          </Link>

          {currentUser ? (
            <>
              <span className="text-white text-sm hidden sm:inline">
                Welcome, {currentUser}
              </span>
              <Link
                to="/profile"
                className="bg-yellow-500 text-black px-3 py-2 rounded hover:bg-yellow-600"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("currentUser");
                  setCurrentUser(null);
                  navigate("/");
                }}
                className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-black px-3 py-2 rounded hover:bg-gray-200"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4 text-black"
        >
          {uniqueCategories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4 text-black"
        >
          <option>All</option>
          <option>Available</option>
          <option>Borrowed</option>
          <option>Sold</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded w-full md:w-1/5 text-black"
        >
          <option value="name">Sort by Name</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-1 transition-all duration-300 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
