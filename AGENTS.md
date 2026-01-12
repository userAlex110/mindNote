# AGENTS.md - Guidelines for AI Coding Agents

## Project Overview

MindNote - EmotionSense Desktop Companion. Documentation complete (v2.0), implementation pending.
- **Main Language**: Python 3.11+ (main application)
- **Secondary**: Node.js (MCP tools)

---

## Build/Lint/Test Commands

### MCP Tools (Node.js)
```bash
cd mcp-tools/diary-record-mcp && npm install && npm start
cd mcp-tools/diary-record-mcp && npm run dev  # auto-restart
```

### Python Project (Not Yet Implemented)
```bash
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt

pytest tests/test_single.py -v  # single test
pytest tests/                   # all tests
ruff check . && ruff check --fix .
pyright .
```

---

## Code Style Guidelines

### Python Conventions

**Imports**: standard → third-party → local
```python
import asyncio
from dataclasses import dataclass
from typing import Dict, List, Optional
import aiohttp
from dialog.router import DialogRouter
```

**Formatting**: Black (100 chars), isort, no trailing whitespace.

**Types**: Use type hints everywhere.
```python
Dict[str, int]  # Not dict[str, int]
List[str]       # Not list[str]
Optional[X]     # Not X | None
```

**Naming**: snake_case vars, UPPER_SASE constants, PascalCase classes, _prefix private.

**Error Handling**: Use specific exceptions, avoid bare except.

### Node.js Conventions (MCP Tools)
```javascript
import express from 'express';
const PORT = 3000;
```

---

## Architecture

```
audio/      # Voice (ASR, TTS, VAD, wakeword)
dialog/     # Engine (intent, routing, LLM)
services/   # Data (emotion, environment, insight)
device/     # Hardware (LED, sensors)
api/        # Interfaces (REST, MCP)
```

**Config Pattern**:
```python
import yaml
from pathlib import Path
config = yaml.safe_load(Path(__file__).parent / "config.yaml")
```

---

## Project Guidelines

### Documentation Files (Do Not Modify)
- `1_产品需求文档.md`, `2_技术架构文档.md`, `3_开发路线图.md`, `README.md`

### API Selection
Use **domestic APIs**:
- **Primary**: 豆包 (Doubao-Seed-1.6-lite) - ¥0.27/month
- **Alternative**: 智谱AI (GLM-4-Air) - ¥0.27/month
- **Avoid**: Claude, OpenAI

### Hardware
- **Platform**: Raspberry Pi 5 4GB + Ubuntu 24.04
- **Sensors**: SHT30 (I2C)
- **Audio**: USB mic + Bluetooth speaker
- **No soldering** - use pre-made modules with DuPont wires

### MCP Tools
Optional layer (Phase 4). Core works without them.

---

## Workflow

1. Check docs in `2_技术架构文档.md`
2. Update docs first
3. Implement following conventions
4. Run lint/tests
5. Commit with clear messages

---

## Communication

- Concise (under 4 lines unless detail requested)
- Chinese for user-facing, English for code
- No preamble/postamble
