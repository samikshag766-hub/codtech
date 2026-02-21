const API_BASE = "http://localhost:5000";
const FLUSH_EVERY_SECONDS = 30;

let current = {
  tabId: null,
  domain: null,
  startedAt: null
};

function getDomain(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function pickCategory(domain) {
  // Simple rule list (you can expand)
  const productive = ["leetcode.com", "github.com", "stackoverflow.com", "w3schools.com"];
  const unproductive = ["facebook.com", "instagram.com", "youtube.com", "x.com"];

  if (productive.includes(domain)) return "productive";
  if (unproductive.includes(domain)) return "unproductive";
  return "neutral";
}

async function getDeviceId() {
  const data = await chrome.storage.local.get(["deviceId"]);
  if (data.deviceId) return data.deviceId;

  const id = crypto.randomUUID();
  await chrome.storage.local.set({ deviceId: id });
  return id;
}

async function saveLocalSeconds(domain, seconds) {
  const key = `time_${domain}`;
  const data = await chrome.storage.local.get([key]);
  const total = (data[key] || 0) + seconds;
  await chrome.storage.local.set({ [key]: total });
}

async function flushToBackend(domain, seconds, startedAt, endedAt) {
  const deviceId = await getDeviceId();
  const category = pickCategory(domain);

  try {
    await fetch(`${API_BASE}/api/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deviceId,
        domain,
        category,
        seconds,
        startedAt,
        endedAt
      })
    });
  } catch (e) {
    // backend might be off; keep local only
  }
}

async function stopAndRecord() {
  if (!current.domain || !current.startedAt) return;

  const endedAt = new Date();
  const seconds = Math.max(1, Math.floor((endedAt - current.startedAt) / 1000));

  await saveLocalSeconds(current.domain, seconds);
  await flushToBackend(current.domain, seconds, current.startedAt, endedAt);

  current.startedAt = null;
}

async function startForTab(tab) {
  const domain = getDomain(tab.url);
  if (!domain) return;

  current.tabId = tab.id;
  current.domain = domain;
  current.startedAt = new Date();
}

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  await stopAndRecord();
  const tab = await chrome.tabs.get(tabId);
  await startForTab(tab);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!tab.active) return;
  if (!changeInfo.url) return;

  await stopAndRecord();
  await startForTab(tab);
});

chrome.windows.onFocusChanged.addListener(async (windowId) => {
  // When user leaves Chrome
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    await stopAndRecord();
  } else {
    const [tab] = await chrome.tabs.query({ active: true, windowId });
    if (tab) await startForTab(tab);
  }
});

// periodic flush chunk (keeps “running” time saved)
setInterval(async () => {
  if (!current.domain || !current.startedAt) return;

  const now = new Date();
  const seconds = Math.max(1, Math.floor((now - current.startedAt) / 1000));

  // reset start time and store chunk
  current.startedAt = now;
  await saveLocalSeconds(current.domain, seconds);
  await flushToBackend(current.domain, seconds, new Date(now.getTime() - seconds * 1000), now);
}, FLUSH_EVERY_SECONDS * 1000);
