const canvas = document.getElementById('jogMap');
const ctx = canvas.getContext('2d');
const status = document.getElementById('status');
const avatar = document.getElementById('avatar');
let coords = [];

document.getElementById('startBtn').onclick = () => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(drawJog, showError);
  } else {
    alert("Geolocation not supported");
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        status.textContent = "Paused or stopped...";
      } else {
        status.textContent = "Running...";
      }
    });
  });
  observer.observe(avatar);

  if ('connection' in navigator) {
    const conn = navigator.connection;
    if (conn.downlink < 1) {
      alert("Warning: Weak Network Connection!");
    }
  }
};

function drawJog(position) {
  let lat = position.coords.latitude * 100;
  let lon = position.coords.longitude * 100;
  coords.push({ lat, lon });

  if (coords.length > 1) {
    ctx.beginPath();
    ctx.moveTo(coords[coords.length - 2].lon, coords[coords.length - 2].lat);
    ctx.lineTo(lon, lat);
    ctx.stroke();
  }

  avatar.style.top = `${lat % 400}px`;
  avatar.style.left = `${lon % 800}px`;
}

function showError(err) {
  status.textContent = `Error: ${err.message}`;
}
