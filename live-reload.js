// Simple JS Live Reload Server
// Serves built JS file and modules with live reload for Webflow integration

const express = require("express");
const chokidar = require("chokidar");
const WebSocket = require("ws");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

// Enable CORS for Webflow integration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Serve static files from root and modules/
app.use(express.static(__dirname));
app.use(
  "/modules",
  express.static(path.join(__dirname, "webflow-modules-txt/modules"))
);

// Serve built file from dist/
app.use("/dist", express.static(path.join(__dirname, "dist")));

// Serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(
    `📦 Arquivo buildado disponível em: http://localhost:${PORT}/dist/index.js`
  );
  console.log(
    `🔗 Use no Webflow: <script src="http://localhost:${PORT}/dist/index.js"></script>`
  );
});

// WebSocket para live reload
const wss = new WebSocket.Server({ server });

function broadcastReload() {
  console.log("🔄 Recarregando navegadores conectados...");
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send("reload");
    }
  });
}

// Função para fazer rebuild automático
function rebuildAndReload() {
  console.log("🔨 Detectada mudança, fazendo rebuild...");
  exec("npm run build", (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Erro no build:", error);
      return;
    }
    console.log("✅ Build concluído!");
    broadcastReload();
  });
}

// Observa mudanças em arquivos JS na pasta modules/
chokidar
  .watch(path.join(__dirname, "webflow-modules-txt/modules"))
  .on("change", (filePath) => {
    console.log(`📝 Arquivo alterado: ${path.basename(filePath)}`);
    rebuildAndReload();
  });

// Para usar no Webflow, adicione esta tag no <head>:
// <script src="http://localhost:3000/dist/index.js"></script>
//
// Para live reload no Webflow, adicione também:
// <script>
//   const ws = new WebSocket('ws://localhost:3000');
//   ws.onmessage = (msg) => { if (msg.data === 'reload') location.reload(); };
// </script>
