# 日记记录MCP工具

这是一个用于情绪日记记录和管理的MCP（Model Context Protocol）工具。它允许用户记录、检索、更新和删除情绪日记条目。

## 功能

- 记录带有情绪评分、标签和环境数据的情绪日记条目
- 在指定日期范围内检索日记条目
- 更新现有日记条目
- 删除日记条目
- 日记条目的持久化存储

## 安装

1. 安装依赖：
```bash
npm install
```

## 使用方法

1. 启动服务器：
```bash
npm start
```

服务器默认在端口3000上启动。

## API端点

### POST /record_emotion_diary
记录新的情绪日记条目。

**请求体：**
```json
{
  "mood_score": 7,
  "mood_tags": ["平静", "专注"],
  "environment_data": {
    "temperature": 23.5,
    "humidity": 45,
    "light_level": 300,
    "weather": "晴天"
  },
  "note": "今天工作很高效"
}
```

**响应：**
```json
{
  "success": true,
  "diary_id": "uuid字符串",
  "message": "情绪日记条目记录成功"
}
```

### GET /get_emotion_diary
检索情绪日记条目。

**查询参数：**
- `start_date`: 开始日期，格式为YYYY-MM-DD（可选）
- `end_date`: 结束日期，格式为YYYY-MM-DD（可选）
- `limit`: 返回条目的最大数量（可选）

**响应：**
```json
[
  {
    "diary_id": "uuid字符串",
    "timestamp": "2023-10-01T10:00:00.000Z",
    "mood_score": 7,
    "mood_tags": ["平静", "专注"],
    "environment_data": {
      "temperature": 23.5,
      "humidity": 45,
      "light_level": 300,
      "weather": "晴天"
    },
    "note": "今天工作很高效"
  }
]
```

### PUT /update_emotion_diary/:diary_id
更新现有日记条目。

**请求体：**
```json
{
  "mood_score": 8,
  "mood_tags": ["开心", "精力充沛"],
  "note": "更新的备注"
}
```

### DELETE /delete_emotion_diary/:diary_id
删除日记条目。

## MCP配置

`mcp-config.json`文件包含用于MCP集成的工具配置。

## 数据存储

日记条目存储在项目目录的`data/diary-entries.json`文件中。