import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";
import NotFound from "./pages/NotFound";
import MapPage from "./pages/MapPage";
import Profile from "./pages/Profile";
import Login from "./pages/LoginSignup";
import MyRequests from "./pages/MyRequests";

const App = () => {
  return (

      <div className="min-h-screen bg-gradient-to-br from-gray-400 via-gray-400 to-gray-100">
   <div className="flex justify-center items-center w-full p-4">
  <header className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white px-6 py-4 rounded-2xl shadow-lg w-full max-w-5xl text-center">
    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide">
      <span className="animate-pulse">⛪</span> Neighbourhood Share <span className="animate-pulse">🗺</span>
    </h1>
  </header>
</div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/item/:id" element={<ItemDetails />} /> {/* ✅ Correct */}
        <Route path="/map" element={<MapPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>

  );
};

export default App;
