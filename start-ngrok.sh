#!/bin/bash
# usage: ./start-ngrok.sh
# Requires: ngrok installed and authtoken set (ngrok config add-authtoken <token>)

# Start the webhook listener in the background
echo "Starting webhook listener..."
node /var/home/vsht/Documents/DP-collab-project/webhook.js &
WEBHOOK_PID=$!
echo "Webhook listener started (PID: $WEBHOOK_PID)"

# Wait for it to be ready
sleep 1

# Start ngrok tunnel to the webhook port
echo "Starting ngrok tunnel on port 9191..."
/var/home/vsht/ngrok http 9191 --log=stdout &
NGROK_PID=$!

echo "ngrok started (PID: $NGROK_PID)"
echo ""
echo "=== IMPORTANT ==="
echo "1. Get your ngrok URL: curl -s http://localhost:4040/api/tunnels | jq '.tunnels[0].public_url'"
echo "2. Set GitHub webhook to: <ngrok-url>/webhook"
echo "3. Set webhook secret to match WEBHOOK_SECRET in webhook.js"
echo ""
echo "To stop: kill $WEBHOOK_PID $NGROK_PID"

wait