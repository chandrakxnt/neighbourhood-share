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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleAddItem = () => {
    if (currentUser) {
      navigate("/add-item");
    } else {
      alert("You must be logged in to add an item.");
      navigate("/login");
    }
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="p-3 sm:p-6 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-black via-gray-500 to-black p-4 mb-4 rounded-2xl">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Items Catalog</h1>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-3 items-center">
            <button
              onClick={handleAddItem}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              + Add Item
            </button>
            <Link
              to="/my-requests"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
            >
              My Requests
            </Link>
            <Link
              to="/map"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              View Map
            </Link>

            {currentUser ? (
              <>
                <span className="text-white text-sm hidden xl:inline">
                  Welcome, {currentUser}
                </span>
                <Link
                  to="/profile"
                  className="bg-yellow-500 text-black px-3 py-2 rounded hover:bg-yellow-600 transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-black px-3 py-2 rounded hover:bg-gray-200 transition-colors"
              >
                Login / Sign Up
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-400 pt-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleAddItem}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-left"
              >
                + Add Item
              </button>
              <Link
                to="/my-requests"
                onClick={closeMenu}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors text-center"
              >
                My Requests
              </Link>
              <Link
                to="/map"
                onClick={closeMenu}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center"
              >
                View Map
              </Link>

              {currentUser ? (
                <>
                  <div className="text-white text-sm py-2">
                    Welcome, {currentUser}
                  </div>
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition-colors text-center"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors text-center"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:gap-4 mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded w-full text-base"
        />

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded text-black text-base"
          >
            {uniqueCategories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="border p-3 rounded text-black text-base"
          >
            <option>All</option>
            <option>Available</option>
            <option>Borrowed</option>
            <option>Sold</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-3 rounded text-black text-base sm:col-span-2 lg:col-span-1"
          >
            <option value="name">Sort by Name</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
      </div>

      {/* Item Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 transition-all duration-300 place-items-center sm:place-items-stretch">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* No items message */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Home;