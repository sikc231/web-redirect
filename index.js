#!/usr/bin/env node
const http = require('http');

const DESTINATION = process.env.DESTINATION_URL;
if (!DESTINATION) {
  console.error('ERROR: DESTINATION_URL environment variable is required.');
  process.exit(1);
}

const PORT = Number(process.env.PORT || 8080);

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const server = http.createServer((req, res) => {
  // Always send a 301 Permanent Redirect to the configured destination.
  res.writeHead(301, {
    Location: DESTINATION,
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-cache'
  });

  // Friendly HTML fallback for browsers that show the body.
  const safe = escapeHtml(DESTINATION);
  res.end(`<!doctype html>
<html>
  <head>
    <meta http-equiv="refresh" content="0;url=${safe}">
    <meta name="robots" content="noindex">
    <title>Moved Permanently</title>
  </head>
  <body>
    <h1>301 Moved Permanently</h1>
    <p>This resource has moved to <a href="${safe}">${safe}</a>.</p>
  </body>
</html>`);
});

server.listen(PORT, () => {
  console.log(`Redirect server listening on port ${PORT} -> ${DESTINATION}`);
});
