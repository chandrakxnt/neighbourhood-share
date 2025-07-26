# 🏘️ Neighbourhood Share 🗺

A React-based web app for neighbors to share, lend, or give away items easily, using a dynamic item dashboard, borrow/request functionality, and location tracking on a map.

---

## ✅ Features Implemented

### 🔐 Authentication
- **Login & Signup** pages using `localStorage` for simple session simulation.
- Only logged-in users can access Add Item, Profile, and Request features.
- **Logout** option shown conditionally based on login state.

### 🏠 Home Page (Item Catalog)
- Fetches and merges `mockItems` with `userItems` from `localStorage`.
- Displays all items with filters: **All, Available, Sold, Borrowed**.
- Clicking an item opens its detailed view.

### ➕ Add Item Page
- Users can submit a new item (name, category, image, etc.).
- Uses placeholder image if no URL is given.
- Items are saved to `localStorage` under `userItems`.

### 👤 Profile Page
- Shows only items added by the current user.
- Users can:
  - **Delete** their items.
  - **Mark as Sold**.

### 🧭 Map Page
- Shows item locations using coordinates and Leaflet-based map integration.
- Clicking a marker shows item info.

### 🔍 Item Detail View
- Shows full detail of the item.
- Conditionally renders a **Request to Borrow** button if item is available.
- Requesting adds/updates the item with `borrowedBy` and `available: false`.

### 📥 My Requests Page
- Shows items requested by the current user.
- Combines mock and user items, filters based on `borrowedBy === currentUser`.

### 🧠 Logic Used
- All item data is merged from:
  - `mockItems.js` (static data)
  - `localStorage.getItem("userItems")` (dynamic user data)
- Each page loads from the combined list.

---

## 🔧 Code Structure

```
src/
├── components/
│   └── ItemCard.jsx
├── data/
│   └── mockItems.js
├── pages/
│   ├── AddItem.jsx
│   ├── Home.jsx
│   ├── ItemDetail.jsx
│   ├── ItemDetails.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── MapPage.jsx
│   ├── Profile.jsx
│   └── MyRequests.jsx
├── App.jsx
└── main.jsx
```

---

## 📦 Future Improvements

- Add real backend with Firebase or Express.
- Search functionality.
- Borrow/return history.
- Admin dashboard for item moderation.
- Notifications system.

---

## 📌 How to Run

```bash
npm install
npm run dev
```

Make sure your backend or static data is linked properly if using custom routes.

---

Built with ❤️ using **React + Tailwind + localStorage**.