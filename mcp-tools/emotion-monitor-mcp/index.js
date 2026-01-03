// index.js
// Main entry point for the Emotion Monitor MCP Tool

const app = require('./emotion-monitor-mcp.js');

// Export the app for potential use in other modules
module.exports = app;

// If running this file directly, start the server
if (require.main === module) {
  // The server is already started in emotion-monitor-mcp.js
  console.log('Emotion Monitor MCP Tool is running');
}