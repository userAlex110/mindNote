// diary-record-mcp.js
// MCP Tool for Emotion Diary Recording

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// In-memory storage for diary entries (in production, use a database)
let diaryEntries = [];

// Function to save diary entries to file
function saveDiaryToFile() {
  const filePath = path.join(__dirname, 'data', 'diary-entries.json');
  // Create data directory if it doesn't exist
  if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(diaryEntries, null, 2));
}

// Function to load diary entries from file
function loadDiaryFromFile() {
  const filePath = path.join(__dirname, 'data', 'diary-entries.json');
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    diaryEntries = JSON.parse(data);
  } else {
    // Initialize with sample data if file doesn't exist
    diaryEntries = [
      {
        diary_id: uuidv4(),
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
        diary_id: uuidv4(),
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
    saveDiaryToFile();
  }
}

// Load diary entries on startup
loadDiaryFromFile();

// MCP Tool: record_emotion_diary
app.post('/record_emotion_diary', (req, res) => {
  try {
    const { mood_score, mood_tags, environment_data, note } = req.body;

    // Validate required fields
    if (typeof mood_score !== 'number' || mood_score < 1 || mood_score > 10) {
      return res.status(400).json({
        success: false,
        message: 'mood_score must be a number between 1 and 10'
      });
    }

    if (!Array.isArray(mood_tags) || mood_tags.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'mood_tags must be a non-empty array of strings'
      });
    }

    // Create new diary entry
    const newEntry = {
      diary_id: uuidv4(),
      timestamp: new Date().toISOString(),
      mood_score,
      mood_tags,
      environment_data: environment_data || {},
      note: note || ''
    };

    // Add to diary entries
    diaryEntries.push(newEntry);

    // Save to file
    saveDiaryToFile();

    res.json({
      success: true,
      diary_id: newEntry.diary_id,
      message: 'Emotion diary entry recorded successfully'
    });
  } catch (error) {
    console.error('Error recording emotion diary:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// MCP Tool: get_emotion_diary
app.get('/get_emotion_diary', (req, res) => {
  try {
    const { start_date, end_date, limit } = req.query;

    // Filter entries by date range if provided
    let filteredEntries = [...diaryEntries];

    if (start_date) {
      const startDate = new Date(start_date);
      filteredEntries = filteredEntries.filter(entry => new Date(entry.timestamp) >= startDate);
    }

    if (end_date) {
      const endDate = new Date(end_date);
      filteredEntries = filteredEntries.filter(entry => new Date(entry.timestamp) <= endDate);
    }

    // Sort by timestamp (newest first)
    filteredEntries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Apply limit if provided
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum) && limitNum > 0) {
        filteredEntries = filteredEntries.slice(0, limitNum);
      }
    }

    res.json(filteredEntries);
  } catch (error) {
    console.error('Error retrieving emotion diary:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// MCP Tool: update_emotion_diary
app.put('/update_emotion_diary/:diary_id', (req, res) => {
  try {
    const { diary_id } = req.params;
    const { mood_score, mood_tags, note } = req.body;

    const entryIndex = diaryEntries.findIndex(entry => entry.diary_id === diary_id);

    if (entryIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Diary entry not found'
      });
    }

    // Update fields if provided
    if (mood_score !== undefined) {
      if (typeof mood_score !== 'number' || mood_score < 1 || mood_score > 10) {
        return res.status(400).json({
          success: false,
          message: 'mood_score must be a number between 1 and 10'
        });
      }
      diaryEntries[entryIndex].mood_score = mood_score;
    }

    if (mood_tags !== undefined) {
      if (!Array.isArray(mood_tags) || mood_tags.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'mood_tags must be a non-empty array of strings'
        });
      }
      diaryEntries[entryIndex].mood_tags = mood_tags;
    }

    if (note !== undefined) {
      diaryEntries[entryIndex].note = note;
    }

    // Save to file
    saveDiaryToFile();

    res.json({
      success: true,
      message: 'Diary entry updated successfully'
    });
  } catch (error) {
    console.error('Error updating emotion diary:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// MCP Tool: delete_emotion_diary
app.delete('/delete_emotion_diary/:diary_id', (req, res) => {
  try {
    const { diary_id } = req.params;

    const initialLength = diaryEntries.length;
    diaryEntries = diaryEntries.filter(entry => entry.diary_id !== diary_id);

    if (diaryEntries.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: 'Diary entry not found'
      });
    }

    // Save to file
    saveDiaryToFile();

    res.json({
      success: true,
      message: 'Diary entry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting emotion diary:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'diary-record-mcp',
    version: '1.0.0',
    description: 'MCP tool for emotion diary recording',
    endpoints: {
      'POST /record_emotion_diary': 'Record a new emotion diary entry',
      'GET /get_emotion_diary': 'Retrieve emotion diary entries',
      'PUT /update_emotion_diary/:diary_id': 'Update an existing diary entry',
      'DELETE /delete_emotion_diary/:diary_id': 'Delete a diary entry'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Diary Record MCP tool running on port ${PORT}`);
  console.log(`Endpoints available:`);
  console.log(`  POST   http://localhost:${PORT}/record_emotion_diary`);
  console.log(`  GET    http://localhost:${PORT}/get_emotion_diary`);
  console.log(`  PUT    http://localhost:${PORT}/update_emotion_diary/:diary_id`);
  console.log(`  DELETE http://localhost:${PORT}/delete_emotion_diary/:diary_id`);
});

// Export for testing
module.exports = app;