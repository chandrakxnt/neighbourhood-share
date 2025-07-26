import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import mockItems from "../data/mockItems";
import { useNavigate } from "react-router-dom";

// Green icon for available
const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Red icon for sold/unavailable
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapPage = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem("userItems")) || [];
    setItems([...mockItems, ...localItems]);
  }, []);

  return (
    <div className="relative h-screen w-full">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-14 z-[1000] bg-white px-4 py-2 rounded shadow text-sm font-semibold hover:bg-gray-100"
      >
        ← Back
      </button>

      {/* Legend box */}
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded shadow px-4 py-3 text-sm">
        <strong>Legend</strong>
        <div className="flex items-center mt-2">
          <img
            src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
            alt="Available"
            className="w-4 h-6 mr-2"
          />
          <span>Available</span>
        </div>
        <div className="flex items-center mt-1">
          <img
            src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"
            alt="Sold"
            className="w-4 h-6 mr-2"
          />
          <span>Sold</span>
        </div>
      </div>

      {/* Leaflet Map */}
      <MapContainer
        center={[18.5204, 73.8567]} // Pune
        zoom={12}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {items
          .filter((item) => item.latitude && item.longitude)
          .map((item, index) => (
            <Marker
              key={index}
              position={[
                parseFloat(item.latitude),
                parseFloat(item.longitude),
              ]}
              icon={item.available ? greenIcon : redIcon}
            >
            <Popup>
  <div className="text-sm">
    <strong>{item.name}</strong>
    <br />
    {item.category}
    <br />
    Owner: {item.owner}
    <br />
    Status: {item.available ? "Available" : "Sold"}
    <br />
    <button
      className="mt-2 text-blue-600 underline"
      onClick={() => navigate(`/item/${item.id}`)}
    >
      View Details →
    </button>
  </div>
</Popup>

            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
