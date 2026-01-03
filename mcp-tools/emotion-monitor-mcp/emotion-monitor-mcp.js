// emotion-monitor-mcp.js
// MCP Tool for Environment Monitoring

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Mock sensor data (in a real implementation, this would come from actual sensors)
let mockEnvironmentData = {
  indoor: {
    temperature: 23.5,
    humidity: 45,
    light_level: 300,
    timestamp: new Date().toISOString()
  },
  outdoor: {
    weather: "sunny",
    weather_code: 100,
    temperature: 25.2,
    humidity: 52,
    wind_speed: 3.2
  }
};

// Function to generate realistic mock data
function generateMockData() {
  // Generate slightly varying data to simulate real sensors
  const tempVariation = (Math.random() - 0.5) * 2; // -1 to +1 degree variation
  const humidityVariation = (Math.random() - 0.5) * 10; // -5% to +5% humidity variation
  const lightVariation = (Math.random() - 0.5) * 100; // -50 to +50 lux variation

  mockEnvironmentData = {
    indoor: {
      temperature: Math.max(15, Math.min(35, 23.5 + tempVariation)),
      humidity: Math.max(20, Math.min(80, 45 + humidityVariation)),
      light_level: Math.max(0, Math.min(1000, 300 + lightVariation)),
      timestamp: new Date().toISOString()
    },
    outdoor: {
      weather: ["sunny", "cloudy", "rainy", "partly-cloudy"][Math.floor(Math.random() * 4)],
      weather_code: Math.floor(Math.random() * 100),
      temperature: Math.max(0, Math.min(40, 25.2 + tempVariation)),
      humidity: Math.max(10, Math.min(95, 52 + humidityVariation)),
      wind_speed: Math.max(0, Math.min(20, 3.2 + (Math.random() - 0.5) * 2))
    }
  };
}

// MCP Tool: get_current_environment
app.get('/get_current_environment', (req, res) => {
  try {
    // Update mock data to simulate real-time sensor readings
    generateMockData();
    
    res.json({
      indoor: mockEnvironmentData.indoor,
      outdoor: mockEnvironmentData.outdoor
    });
  } catch (error) {
    console.error('Error getting current environment:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// MCP Tool: get_environment_history
app.get('/get_environment_history', (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    // Generate mock historical data
    const history = [];
    const now = new Date();
    
    // Generate 10 data points for the last 24 hours
    for (let i = 0; i < 10; i++) {
      const timestamp = new Date(now.getTime() - i * 144 * 60000); // Every 2.4 hours
      const tempVariation = (Math.random() - 0.5) * 4; // -2 to +2 degree variation
      const humidityVariation = (Math.random() - 0.5) * 15; // -7.5% to +7.5% humidity variation
      
      history.push({
        timestamp: timestamp.toISOString(),
        temperature: Math.max(15, Math.min(35, 23.5 + tempVariation)),
        humidity: Math.max(20, Math.min(80, 45 + humidityVariation)),
        light_level: Math.max(0, Math.min(1000, 300 + (Math.random() - 0.5) * 200))
      });
    }
    
    // Filter by date range if provided
    let filteredHistory = history;
    
    if (start_date) {
      const startDate = new Date(start_date);
      filteredHistory = filteredHistory.filter(item => new Date(item.timestamp) >= startDate);
    }
    
    if (end_date) {
      const endDate = new Date(end_date);
      filteredHistory = filteredHistory.filter(item => new Date(item.timestamp) <= endDate);
    }
    
    res.json(filteredHistory);
  } catch (error) {
    console.error('Error getting environment history:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'emotion-monitor-mcp',
    version: '1.0.0',
    description: 'MCP tool for environment monitoring',
    endpoints: {
      'GET /get_current_environment': 'Get current environment data',
      'GET /get_environment_history': 'Get environment history data'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Emotion Monitor MCP tool running on port ${PORT}`);
  console.log(`Endpoints available:`);
  console.log(`  GET http://localhost:${PORT}/get_current_environment`);
  console.log(`  GET http://localhost:${PORT}/get_environment_history`);
});

// Export for testing
module.exports = app;