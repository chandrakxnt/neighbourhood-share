import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const navigate = useNavigate();

  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    return (
      <div className="text-center mt-20 text-lg">
        You must be logged in to add items. <br />
        <Link to="/login" className="text-blue-600 underline">
          Login here
        </Link>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    condition: "",
    owner: "",
    available: true,
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    alert("You must be logged in to add items.");
    return;
  }

  const fallbackText = encodeURIComponent(formData.name || "No Image");

  const imageToUse =
    formData.image.trim() === ""
      ? `https://placehold.co/300x200?text=${fallbackText}`
      : formData.image;

  const newItem = {
    ...formData,
    id: `itm_${Date.now()}`,
    image: imageToUse,
    available: true,
    sold: false,
    owner: currentUser, 
  };

  const existingItems = JSON.parse(localStorage.getItem("userItems")) || [];
  const updatedItems = [...existingItems, newItem];

  localStorage.setItem("userItems", JSON.stringify(updatedItems));
  console.log("Saved to localStorage:", updatedItems);

  alert("Item added successfully!");
  navigate("/");
};


  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded shadow-2xl">
      <h2 className="text-2xl font-bold mb-4">Add New Item</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Item name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded text-black"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded text-black"
          required
        />

        <input
          name="category"
          type="text"
          placeholder="Category (e.g., Kitchen, Tools)"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded text-black"
          required
        />

        <input
          name="condition"
          type="text"
          placeholder="Condition (e.g., Good, Excellent)"
          value={formData.condition}
          onChange={handleChange}
          className="w-full border p-2 rounded text-black"
          required
        />
        <div className="flex gap-4">
          <input
            name="latitude"
            type="text"
            placeholder="latitude (e.g., 37.7749)"
            value={formData.latitude}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
            required
          />
          <input
            name="longitude"
            type="text"
            placeholder="longitude (e.g., -122.4194)"
            value={formData.longitude}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
            required
          />
        </div>

        <input
          name="owner"
          type="text"
          placeholder="Owner Name"
          value={formData.owner}
          onChange={handleChange}
          className="w-full border p-2 rounded text-black"
          required
        />

        <input
          name="image"
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-2 rounded text-black"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="accent-blue-500"
          />
          Available
        </label>
        <div className="flex justify-center gap-10 mt-4">
          <button
            type="submit"
            className="bg-blue-600  text-white px-4 py-2 rounded hover:bg-blue-700 hover:scale-105 transition-transform "
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-300 hover:scale-105 transition-transform text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
