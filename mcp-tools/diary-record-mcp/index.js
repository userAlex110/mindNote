// index.js
// Main entry point for the Diary Record MCP Tool

const app = require('./diary-record-mcp.js');

// Export the app for potential use in other modules
module.exports = app;

// If running this file directly, start the server
if (require.main === module) {
  // The server is already started in diary-record-mcp.js
  console.log('Diary Record MCP Tool is running');
}