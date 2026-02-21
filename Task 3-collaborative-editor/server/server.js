require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./src/db");
const Doc = require("./src/models/Doc");

const app = express();

// ✅ allow frontend origin
const ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({
  origin: ORIGIN,
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => res.send("Collab server running"));

const server = http.createServer(app);

// ✅ allow socket origin
const io = new Server(server, {
  cors: {
    origin: ORIGIN,
    methods: ["GET", "POST"],
    credentials: true
  }
});

async function getOrCreateDoc(id) {
  let doc = await Doc.findOne({ docId: id });
  if (!doc) doc = await Doc.create({ docId: id, data: {} });
  return doc;
}

io.on("connection", (socket) => {
  socket.on("join", async (docId) => {
    socket.join(docId);

    const doc = await getOrCreateDoc(docId);
    socket.emit("load", doc.data);

    socket.on("send-changes", (delta) => {
      socket.to(docId).emit("receive-changes", delta);
    });

    socket.on("save", async (data) => {
      await Doc.findOneAndUpdate({ docId }, { data }, { upsert: true });
    });
  });
});

// ✅ IMPORTANT: match env variable name
connectDB(process.env.MONGODB_URI).then(() => {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log("Server on", PORT));
});
