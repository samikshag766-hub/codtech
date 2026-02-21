import { useState } from "react";
import Editor from "./components/Editor";

export default function App() {
  const [docId, setDocId] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="container">
      {!open ? (
        <div className="box">
          <h2>📝 Live Doc Editor</h2>
          <p>Real-time collaborative editing</p>

          <input
            placeholder="Enter Document ID"
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
          />

          <button onClick={() => docId && setOpen(true)}>
            Open Document
          </button>
        </div>
      ) : (
        <Editor docId={docId} />
      )}
    </div>
  );
}
