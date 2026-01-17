# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MindNote** - 智能情绪桌面摆件 (Smart Emotion Desktop Companion) running on Raspberry Pi 5 with hybrid local+cloud architecture. Features voice interaction (ASR→LLM→TTS), environmental sensing, and emotion diary tracking.

## Commands

### MCP Tools (Node.js)
```bash
# Start individual MCP tool
cd mcp-tools/<tool-name> && npm install && npm start

# Auto-restart during development
npm run dev

# Available tools:
# - diary-record-mcp (port 3000)
# - emotion-monitor-mcp (port 3001)
# - insight-generator-mcp (port 3002)
```

### Python Backend (not yet implemented)
```bash
# Setup
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# Testing
pytest tests/test_single.py -v  # single test
pytest tests/                   # all tests

# Linting
ruff check . && ruff check --fix .
pyright .
```

## Architecture

### 5-Layer Architecture
1. **Voice Interaction Layer**: Porcupine (wake word) → WebRTC VAD → Sherpa-onnx ASR → Piper TTS
2. **Dialog Engine Layer**: TFLite intent classification → Local TinyLlama fallback → Cloud LLM (豆包/智谱AI)
3. **Data Services Layer**: SQLite database for conversations, emotions, environment data
4. **Device Control Layer**: SHT30 sensor (I2C), WS2812 LED, audio devices
5. **Open Interface Layer**: REST API, MCP Server (implemented)

### Key Directories
- `mcp-tools/`: Node.js MCP server implementations
- `audio/`: Speech processing (ASR, TTS, VAD, wake word) - not yet implemented
- `dialog/`: Intent classification and LLM integration - not yet implemented
- `services/`: Core business logic - not yet implemented
- `device/`: Hardware control (LED, sensors) - not yet implemented
- `api/`: REST and MCP endpoints - not yet implemented

## Code Conventions

### Python (main application)
- Imports: standard → third-party → local
- Formatting: Black (100 chars), isort, no trailing whitespace
- Type hints: Use `Dict[str, int]`, `List[str]`, `Optional[X]` (not lowercase)
- Naming: snake_case vars, UPPER_CASE constants, PascalCase classes, _prefix private
- Error handling: Use specific exceptions, avoid bare except

### Node.js (MCP tools)
- ES modules with `import` syntax
- Express framework for HTTP server

## Important Files

- `AGENTS.md`: Guidelines for AI coding agents (read first)
- `2_技术架构文档.md`: Technical architecture details
- `3_开发路线图.md`: Development roadmap
- `mcp-tools/README.md`: MCP tools documentation

## API Preferences

- **Primary**: 豆包 (Doubao-Seed-1.6-lite)
- **Alternative**: 智谱AI (GLM-4-Air)
- Avoid: Claude, OpenAI APIs
