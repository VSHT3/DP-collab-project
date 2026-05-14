import http from "http";
import { exec } from "child_process";
import crypto from "crypto";

const WEBHOOK_SECRET = "idktbh"; // Change this!
const PORT = 9191;

const server = http.createServer((req, res) => {
  // Health check endpoint for ngrok
  if (req.url === "/health") {
    res.writeHead(200);
    res.end("ok");
    return;
  }

  if (req.url === "/webhook" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      // Verify GitHub signature (optional but recommended)
      const sig = req.headers["x-hub-signature-256"] || "";
      const expectedSig =
        "sha256=" +
        crypto.createHmac("sha256", WEBHOOK_SECRET).update(body).digest("hex");

      if (sig !== expectedSig) {
        console.log("[webhook] Invalid signature, ignoring.");
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }

      const event = req.headers["x-github-event"];
      console.log(`[webhook] Received event: ${event}`);

      if (event === "push") {
        const payload = JSON.parse(body);
        const branch = payload.ref?.replace("refs/heads/", "");
        console.log(`[webhook] Push to branch: ${branch}`);

        // Only deploy pushes to main/master
        if (branch === "main" || branch === "master") {
          console.log("[webhook] Triggering deploy...");
          exec(
            "bash /var/home/vsht/Documents/DP-collab-project/deploy.sh",
            (err, stdout, stderr) => {
              if (err) {
                console.error("[webhook] Deploy failed:", stderr);
              } else {
                console.log("[webhook] Deploy completed:", stdout);
              }
            },
          );
        }
      }

      res.writeHead(200);
      res.end("ok");
    });
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(PORT, () => {
  console.log(`[webhook] Listening on port ${PORT}`);
  console.log(`[webhook] Webhook endpoint: http://localhost:${PORT}/webhook`);
});
