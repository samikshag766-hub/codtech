import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { io } from "socket.io-client";
import "react-quill/dist/quill.snow.css";

export default function Editor({ docId }) {
  const [socket, setSocket] = useState(null);
  const quillRef = useRef(null);

  useEffect(() => {
    const s = io(import.meta.env.VITE_API_URL);
    setSocket(s);
    return () => s.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit("join", docId);

    socket.on("load", (data) => {
      quillRef.current.getEditor().setContents(data);
    });

    socket.on("receive-changes", (delta) => {
      quillRef.current.getEditor().updateContents(delta);
    });
  }, [socket, docId]);

  const onChange = (content, delta, source) => {
    if (source === "user") {
      socket.emit("send-changes", delta);
    }
    socket.emit("save", quillRef.current.getEditor().getContents());
  };

  return (
    <div className="editor-container">
      <div className="topbar">
        📄 Document ID: {docId}
      </div>

      <ReactQuill
        ref={quillRef}
        theme="snow"
        onChange={onChange}
      />
    </div>
  );
}
