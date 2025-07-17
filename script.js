const canvas = document.getElementById("jogMap");
const ctx = canvas.getContext("2d");
const statusText = document.getElementById("status");
const avatar = document.getElementById("avatar");
const distanceText = document.getElementById("distance");

let lastLat = null;
let lastLon = null;
let totalDistance = 0;
let watcher = null;
let positions = []; // route storage
let smoothingBuffer = [];

const MAX_BUFFER = 3; // for smoothing

document.getElementById("startBtn").onclick = () => {
  if (watcher !== null) return;

  if (navigator.geolocation) {
    watcher = navigator.geolocation.watchPosition(drawJog, showError, {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 5000
    });
    statusText.textContent = "Tracking started...";
  } else {
    alert("Geolocation not supported");
  }
};

document.getElementById("stopBtn").onclick = () => {
  if (watcher !== null) {
    navigator.geolocation.clearWatch(watcher);
    watcher = null;
    statusText.textContent = "Stopped";
  }
};

document.getElementById("resetBtn").onclick = () => {
  if (watcher !== null) {
    navigator.geolocation.clearWatch(watcher);
    watcher = null;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lastLat = null;
  lastLon = null;
  totalDistance = 0;
  distanceText.textContent = "0";
  positions = [];
  smoothingBuffer = [];
  localStorage.removeItem("route");
  statusText.textContent = "Reset";
};

function drawJog(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  smoothingBuffer.push({ lat, lon });
  if (smoothingBuffer.length > MAX_BUFFER) {
    smoothingBuffer.shift();
  }

  lat =
    smoothingBuffer.reduce((sum, p) => sum + p.lat, 0) / smoothingBuffer.length;
  lon =
    smoothingBuffer.reduce((sum, p) => sum + p.lon, 0) / smoothingBuffer.length;

  const moved =
    lastLat !== null && lastLon !== null
      ? haversineDistance(lat, lon, lastLat, lastLon)
      : 0;

  console.log(`Moved: ${moved.toFixed(2)}m - Lat: ${lat}, Lon: ${lon}`);

  if (moved > 1) {
    totalDistance += moved;
    distanceText.textContent = totalDistance.toFixed(2);

    const prevX = (lastLon * 10000) % canvas.width;
    const prevY = (lastLat * 10000) % canvas.height;
    const newX = (lon * 10000) % canvas.width;
    const newY = (lat * 10000) % canvas.height;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(newX, newY);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();

    avatar.style.left = `${newX}px`;
    avatar.style.top = `${newY}px`;

    positions.push({ lat, lon });
    localStorage.setItem("route", JSON.stringify(positions));

    statusText.textContent = "Running...";
  } else {
    statusText.textContent = "Paused or stopped...";
  }

  lastLat = lat;
  lastLon = lon;
}

function showError(err) {
  statusText.textContent = `Error: ${err.message}`;
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
