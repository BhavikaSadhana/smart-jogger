# 🏃‍♀️ Jogging Tracker Web App

A simple web application that tracks your jogging route using GPS, displays it on a canvas, calculates total distance covered, and visually moves an avatar along the path.

## 🚀 Features

- Live GPS tracking using the browser’s Geolocation API  
- Real-time distance calculation using the Haversine formula  
- Smooth route tracking with GPS data smoothing  
- Visual jog path rendered on HTML5 Canvas  
- Start / Stop / Reset controls  
- Persistent route storage using `localStorage`  
- Moving avatar showing current position 

## 🛠️ Technologies Used

- HTML5  
- CSS3  
- JavaScript  
- Geolocation API  
- Canvas API  

## 📂 Project Structure

```
jogging-tracker/
├── index.html         # Main HTML layout
├── styles.css         # Styling for the UI and avatar
├── script.js          # Logic for GPS tracking, drawing, and distance
└── README.md          # Project documentation
```

## 📦 How to Run

1. **Clone or Download** this repository.
2. Open `index.html` in any modern browser (Chrome/Firefox/Edge).
3. Allow GPS permission when prompted.
4. Click **Start Jog** to begin tracking your jogging.
5. Click **Stop** to pause or stop tracking.
6. Click **Reset** to clear the route and stats.

> ⚠️ Note: GPS tracking only works on **HTTPS domains** or **localhost**. Mobile devices provide more accurate results.

## 📏 How Distance Is Calculated

This app uses the **Haversine Formula** to measure distance between two geographical points:

Only significant movements (`> 1 meter`) are counted toward the total distance.
