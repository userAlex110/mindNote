// insight-generator-mcp.js
// MCP Tool for Insight Generation

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());

// Function to analyze diary entries and generate insights
function generateInsights(diaryEntries) {
  if (!diaryEntries || diaryEntries.length === 0) {
    return {
      period: "No data available",
      average_mood: 0,
      mood_trend: "insufficient_data",
      top_mood_tags: [],
      environment_correlations: [],
      improvement_suggestions: ["Start recording your mood to get insights"],
      positive_reinforcements: ["Welcome! Start tracking your emotions to see patterns."],
      data_quality: "poor"
    };
  }

  // Calculate average mood
  const totalMood = diaryEntries.reduce((sum, entry) => sum + entry.mood_score, 0);
  const averageMood = parseFloat((totalMood / diaryEntries.length).toFixed(2));

  // Determine mood trend (simplified)
  let moodTrend = "stable";
  if (diaryEntries.length >= 2) {
    const recentEntries = [...diaryEntries].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const latestMood = recentEntries[0].mood_score;
    const previousMood = recentEntries[Math.min(1, recentEntries.length - 1)].mood_score;
    
    if (latestMood > previousMood + 1) {
      moodTrend = "improving";
    } else if (latestMood < previousMood - 1) {
      moodTrend = "declining";
    }
  }

  // Get top mood tags
  const tagCount = {};
  diaryEntries.forEach(entry => {
    entry.mood_tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  
  const topMoodTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(item => item[0]);

  // Generate environment correlations (simplified)
  const environmentCorrelations = [];
  if (diaryEntries.length > 2) {
    // This is a simplified correlation analysis
    // In a real implementation, you would use more sophisticated statistical methods
    environmentCorrelations.push({
      factor: "temperature",
      correlation: 0.2, // Weak positive correlation
      description: "Slight positive correlation between temperature and mood"
    });
    
    environmentCorrelations.push({
      factor: "humidity",
      correlation: -0.1, // Weak negative correlation
      description: "Slight negative correlation between humidity and mood"
    });
    
    environmentCorrelations.push({
      factor: "light_level",
      correlation: 0.3, // Moderate positive correlation
      description: "Moderate positive correlation between light level and mood"
    });
  }

  // Generate improvement suggestions
  const improvementSuggestions = [];
  if (averageMood < 5) {
    improvementSuggestions.push("Consider taking breaks to relax and recharge");
    improvementSuggestions.push("Try to incorporate more physical activity into your routine");
  } else if (averageMood < 7) {
    improvementSuggestions.push("Try to identify what's affecting your mood");
    improvementSuggestions.push("Consider talking to a friend or counselor");
  } else {
    improvementSuggestions.push("Keep up the good work maintaining your mood");
  }

  // Generate positive reinforcements
  const positiveReinforcements = [];
  if (moodTrend === "improving") {
    positiveReinforcements.push("Great to see your mood improving! Keep up the good work.");
  } else if (moodTrend === "stable") {
    positiveReinforcements.push("Your mood has been stable, which shows good emotional balance.");
  } else {
    positiveReinforcements.push("Remember that mood fluctuations are normal. Be kind to yourself.");
  }

  if (topMoodTags.includes("happy") || topMoodTags.includes("joyful")) {
    positiveReinforcements.push("It's wonderful that happiness is a common emotion for you!");
  }

  // Determine data quality
  const dataQuality = diaryEntries.length > 10 ? "good" : diaryEntries.length > 3 ? "fair" : "poor";

  return {
    period: `${diaryEntries.length} entries analyzed`,
    average_mood: averageMood,
    mood_trend: moodTrend,
    top_mood_tags: topMoodTags,
    environment_correlations: environmentCorrelations,
    improvement_suggestions: improvementSuggestions,
    positive_reinforcements: positiveReinforcements,
    data_quality: dataQuality
  };
}

// Function to generate trend analysis
function generateTrendAnalysis(period) {
  // This is a simplified trend analysis
  // In a real implementation, you would analyze actual diary data
  
  const trendAnalysis = {
    period: period,
    mood_trend: ["improving", "stable", "declining"][Math.floor(Math.random() * 3)],
    key_insights: [
      "Your mood tends to be higher on days with good weather",
      "You seem to feel more energetic in the morning hours",
      "Your mood appears to improve when humidity is between 40-60%"
    ],
    correlation_findings: [
      {
        factor: "temperature",
        correlation: 0.2,
        description: "Slight positive correlation between temperature and mood"
      },
      {
        factor: "light_level",
        correlation: 0.4,
        description: "Moderate positive correlation between light level and mood"
      },
      {
        factor: "humidity",
        correlation: -0.1,
        description: "Slight negative correlation between humidity and mood"
      }
    ],
    recommendations: [
      "Try to spend more time in well-lit areas during low-light periods",
      "Consider using a humidifier when indoor air is too dry",
      "Take advantage of good weather days for outdoor activities"
    ],
    positive_highlights: [
      "You've shown resilience during challenging periods",
      "Your mood tracking consistency is commendable",
      "You're taking proactive steps to understand your emotional patterns"
    ]
  };

  return trendAnalysis;
}

// MCP Tool: get_emotion_insights
app.get('/get_emotion_insights', (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    // In a real implementation, this would fetch diary entries from a database
    // For this example, we'll create mock diary entries
    const mockDiaryEntries = [
      {
        diary_id: "1",
        timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        mood_score: 7,
        mood_tags: ["calm", "focused"],
        environment_data: {
          temperature: 23.5,
          humidity: 45,
          light_level: 300,
          weather: "sunny"
        },
        note: "Had a productive day at work"
      },
      {
        diary_id: "2",
        timestamp: new Date().toISOString(),
        mood_score: 8,
        mood_tags: ["happy", "energetic"],
        environment_data: {
          temperature: 24.2,
          humidity: 48,
          light_level: 450,
          weather: "sunny"
        },
        note: "Great day with good weather"
      }
    ];
    
    // Filter entries by date range if provided
    let filteredEntries = [...mockDiaryEntries];
    
    if (start_date) {
      const startDate = new Date(start_date);
      filteredEntries = filteredEntries.filter(entry => new Date(entry.timestamp) >= startDate);
    }
    
    if (end_date) {
      const endDate = new Date(end_date);
      filteredEntries = filteredEntries.filter(entry => new Date(entry.timestamp) <= endDate);
    }
    
    const insights = generateInsights(filteredEntries);
    
    res.json(insights);
  } catch (error) {
    console.error('Error generating emotion insights:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// MCP Tool: get_trend_analysis
app.get('/get_trend_analysis', (req, res) => {
  try {
    const { period = 'week' } = req.query;
    
    const trendAnalysis = generateTrendAnalysis(period);
    
    res.json(trendAnalysis);
  } catch (error) {
    console.error('Error generating trend analysis:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// MCP Tool: export_data
app.get('/export_data', (req, res) => {
  try {
    const { start_date, end_date, format = 'json' } = req.query;
    
    // In a real implementation, this would fetch diary entries from a database
    // For this example, we'll create mock diary entries
    const mockDiaryEntries = [
      {
        diary_id: "1",
        timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        mood_score: 7,
        mood_tags: ["calm", "focused"],
        environment_data: {
          temperature: 23.5,
          humidity: 45,
          light_level: 300,
          weather: "sunny"
        },
        note: "Had a productive day at work"
      },
      {
        diary_id: "2",
        timestamp: new Date().toISOString(),
        mood_score: 8,
        mood_tags: ["happy", "energetic"],
        environment_data: {
          temperature: 24.2,
          humidity: 48,
          light_level: 450,
          weather: "sunny"
        },
        note: "Great day with good weather"
      }
    ];
    
    // Filter entries by date range if provided
    let filteredEntries = [...mockDiaryEntries];
    
    if (start_date) {
      const startDate = new Date(start_date);
      filteredEntries = filteredEntries.filter(entry => new Date(entry.timestamp) >= startDate);
    }
    
    if (end_date) {
      const endDate = new Date(end_date);
      filteredEntries = filteredEntries.filter(entry => new Date(entry.timestamp) <= endDate);
    }
    
    if (format === 'csv') {
      // Generate CSV content
      let csvContent = "Timestamp,Mood Score,Mood Tags,Note\n";
      filteredEntries.forEach(entry => {
        csvContent += `"${entry.timestamp}",${entry.mood_score},"${entry.mood_tags.join(';')}","${entry.note}"\n`;
      });
      
      res.header('Content-Type', 'text/csv');
      res.header('Content-Disposition', 'attachment; filename=emotion_data.csv');
      res.send(csvContent);
    } else {
      // Default to JSON
      res.json({
        download_url: "data not applicable in mock implementation",
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
        data: filteredEntries
      });
    }
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'insight-generator-mcp',
    version: '1.0.0',
    description: 'MCP tool for emotion insight generation',
    endpoints: {
      'GET /get_emotion_insights': 'Get emotion insights based on diary entries',
      'GET /get_trend_analysis': 'Get trend analysis',
      'GET /export_data': 'Export diary data'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Insight Generator MCP tool running on port ${PORT}`);
  console.log(`Endpoints available:`);
  console.log(`  GET http://localhost:${PORT}/get_emotion_insights`);
  console.log(`  GET http://localhost:${PORT}/get_trend_analysis`);
  console.log(`  GET http://localhost:${PORT}/export_data`);
});

// Export for testing
module.exports = app;