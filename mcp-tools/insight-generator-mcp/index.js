// index.js
// Main entry point for the Insight Generator MCP Tool

const app = require('./insight-generator-mcp.js');

// Export the app for potential use in other modules
module.exports = app;

// If running this file directly, start the server
if (require.main === module) {
  // The server is already started in insight-generator-mcp.js
  console.log('Insight Generator MCP Tool is running');
}