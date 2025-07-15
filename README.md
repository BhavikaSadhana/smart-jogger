# 🏃 Smart Jogger – A Smart Running Assistant

Smart Jogger is a web-based app that helps runners track their route, detect movement, and stay informed about their network connectivity. It uses modern Web APIs to enhance the outdoor jogging experience.

---

## 🌐 Live Features

- 📍 **Real-time location tracking** with **Geolocation API**
- 🗺️ **Live route drawing** on a canvas using **Canvas API**
- 👀 **Inactivity detection** using **Intersection Observer API**
- 📶 Optional: Warns users about poor connection with the **Network Information API**

---

## 🛠 Technologies Used

- HTML, CSS, JavaScript
- Web APIs:
  - Geolocation API
  - Canvas API
  - Intersection Observer API
  - Network Information API (Optional)

---

## 🚀 How to Use

1. **Download or clone** the repository.
2. Open index.html in any modern browser (Chrome recommended).
3. Click **Start Jog** to begin:
   - The app will request location permission.
   - Your avatar will move as you walk or jog.
   - Your route will be drawn live on the canvas.
   - If your avatar is out of view, you’ll see a pause warning.
   - If the network is weak, you'll get a notification.

---

## 📁 Project Structure


smart-jogger/
│
├── index.html       # Main HTML page
├── styles.css       # Styling for canvas and layout
├── script.js        # Main logic with API usage
└── README.md        # Project description and instructions


---

## 📌 Notes

- The app uses simplified canvas coordinates. It's intended for educational use, not accurate geo plotting.
- For real-world deployment, integrate a map library like **Leaflet** or **Google Maps JS API**.

---

## 🔒 Permissions

This app requires location access from the browser. Make sure you allow it when prompted.
