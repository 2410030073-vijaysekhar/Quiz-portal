const express = require('express');
const path = require('path');

const app = express();

// Serve static files from repository root
const staticDir = path.join(__dirname);
app.use(express.static(staticDir, {
  index: 'index.html',
}));

// Health check
app.get('/_health', (req, res) => {
  res.json({ status: 'ok' });
});

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

const port = process.env.PORT || 3000;
const host = '0.0.0.0';
app.listen(port, host, () => {
  console.log(`Server listening on ${host}:${port}`);
});
