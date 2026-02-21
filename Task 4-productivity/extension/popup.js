function secToMin(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}

async function getDeviceId() {
  const data = await chrome.storage.local.get(["deviceId"]);
  return data.deviceId || "not-set-yet";
}

async function loadTimes() {
  const all = await chrome.storage.local.get(null);
  const rows = Object.keys(all)
    .filter((k) => k.startsWith("time_"))
    .map((k) => ({ domain: k.replace("time_", ""), seconds: all[k] }))
    .sort((a, b) => b.seconds - a.seconds)
    .slice(0, 12);

  const list = document.getElementById("list");
  list.innerHTML = rows.length ? "" : "<p class='small'>No data yet.</p>";

  for (const r of rows) {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<span>${r.domain}</span><strong>${secToMin(r.seconds)}</strong>`;
    list.appendChild(div);
  }
}

document.getElementById("refresh").addEventListener("click", loadTimes);

document.getElementById("openDash").addEventListener("click", () => {
  chrome.tabs.create({ url: "http://localhost:5173" });
});

(async function init() {
  const id = await getDeviceId();
  document.getElementById("device").textContent = `Device ID: ${id}`;
  await loadTimes();
})();

document.getElementById("openDash").addEventListener("click", async () => {
  const data = await chrome.storage.local.get(["deviceId"]);
  const id = data.deviceId;

  // open dashboard and pass id in URL
  chrome.tabs.create({ url: `http://localhost:5173/?deviceId=${id}` });
});
