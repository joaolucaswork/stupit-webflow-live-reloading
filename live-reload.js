// Simple JS Live Reload Server
// Serves files from modules/ and reloads browser on change

const express = require("express");
const chokidar = require("chokidar");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from root and modules/
app.use(express.static(__dirname));
app.use(
  "/modules",
  express.static(path.join(__dirname, "webflow-modules-txt/modules"))
);

// Serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// WebSocket para live reload
const wss = new WebSocket.Server({ server });

function broadcastReload() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send("reload");
    }
  });
}

// Observa mudanças em arquivos JS na pasta modules/
chokidar
  .watch(path.join(__dirname, "webflow-modules-txt/modules"))
  .on("change", broadcastReload);

// Injetar script de live reload no index.html
// Adicione no <head> do seu index.html:
// <script>
//   const ws = new WebSocket('ws://localhost:3000');
//   ws.onmessage = (msg) => { if (msg.data === 'reload') location.reload(); };
// </script>
