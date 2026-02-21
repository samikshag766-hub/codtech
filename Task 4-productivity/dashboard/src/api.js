const API_BASE = "http://localhost:5000";

export async function getDeviceId() {
  const url = new URL(window.location.href);
  const fromUrl = url.searchParams.get("deviceId");
  if (fromUrl) {
    localStorage.setItem("deviceId", fromUrl);
    return fromUrl;
  }

  let id = localStorage.getItem("deviceId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("deviceId", id);
  }
  return id;
}


export async function fetchSummary(deviceId) {
  const r = await fetch(`${API_BASE}/api/reports/summary?deviceId=${deviceId}&days=7`);
  return r.json();
}

export async function fetchWeekly(deviceId) {
  const r = await fetch(`${API_BASE}/api/reports/weekly?deviceId=${deviceId}`);
  return r.json();
}
