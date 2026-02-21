import React, { useEffect, useState } from "react";
import { getDeviceId, fetchSummary, fetchWeekly } from "./api";
import "./styles.css";

function secToHr(sec) {
  const h = (sec / 3600).toFixed(2);
  return `${h} hrs`;
}

export default function App() {
  const [deviceId, setDeviceId] = useState("");
  const [summary, setSummary] = useState(null);
  const [weekly, setWeekly] = useState(null);

  async function load() {
    const id = await getDeviceId();
    setDeviceId(id);

    const s = await fetchSummary(id);
    const w = await fetchWeekly(id);
    setSummary(s);
    setWeekly(w);
  }

  useEffect(() => { load(); }, []);

  const totals = summary?.totals;
  const topDomains = summary?.topDomains || [];
  const rep = weekly?.report;

  return (
    <div className="container">
      <h1>Productivity Dashboard</h1>
      <p className="muted">Device ID: {deviceId}</p>

      <button onClick={load}>Refresh</button>

      <div className="grid">
        <div className="card">
          <h2>Last 7 Days</h2>
          {totals ? (
            <>
              <p>Total: <b>{secToHr(totals.total)}</b></p>
              <p>Productive: <b>{secToHr(totals.productive)}</b></p>
              <p>Unproductive: <b>{secToHr(totals.unproductive)}</b></p>
              <p>Neutral: <b>{secToHr(totals.neutral)}</b></p>
            </>
          ) : <p className="muted">No data yet.</p>}
        </div>

        <div className="card">
          <h2>This Week Report</h2>
          {rep ? (
            <>
              <p>Total: <b>{secToHr(rep.total)}</b></p>
              <p>Productive: <b>{secToHr(rep.productive)}</b></p>
              <p>Unproductive: <b>{secToHr(rep.unproductive)}</b></p>
              <p>Neutral: <b>{secToHr(rep.neutral)}</b></p>
            </>
          ) : <p className="muted">No weekly data yet.</p>}
        </div>

        <div className="card full">
          <h2>Top Websites (Last 7 Days)</h2>
          {topDomains.length ? (
            <table>
              <thead>
                <tr><th>Domain</th><th>Time</th></tr>
              </thead>
              <tbody>
                {topDomains.map((d) => (
                  <tr key={d.domain}>
                    <td>{d.domain}</td>
                    <td><b>{secToHr(d.seconds)}</b></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p className="muted">No domain stats yet.</p>}
        </div>
      </div>
    </div>
  );
}
