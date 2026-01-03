# 洞察生成MCP工具

这是一个用于情绪洞察生成的MCP（Model Context Protocol）工具。它分析情绪日记条目以提供洞察、趋势分析和数据导出功能。

## 功能

- 基于日记条目生成情绪洞察
- 分析情绪趋势
- 以JSON或CSV格式导出日记数据
- 提供改进建议和积极鼓励

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

服务器默认在端口3002上启动。

## API端点

### GET /get_emotion_insights
基于日记条目获取情绪洞察。

**查询参数：**
- `start_date`: 开始日期，格式为YYYY-MM-DD（可选）
- `end_date`: 结束日期，格式为YYYY-MM-DD（可选）

**响应：**
```json
{
  "period": "分析了2个条目",
  "average_mood": 7.5,
  "mood_trend": "稳定",
  "top_mood_tags": ["开心", "平静"],
  "environment_correlations": [
    {
      "factor": "温度",
      "correlation": 0.2,
      "description": "温度与情绪之间存在轻微正相关"
    }
  ],
  "improvement_suggestions": ["继续保持良好的情绪管理"],
  "positive_reinforcements": ["你的情绪一直很稳定，这表明了良好的情绪平衡。"],
  "data_quality": "一般"
}
```

### GET /get_trend_analysis
获取情绪模式的趋势分析。

**查询参数：**
- `period`: 分析的时间段（week, month, quarter）- 默认为'week'

**响应：**
```json
{
  "period": "周",
  "mood_trend": "改善中",
  "key_insights": [
    "天气好的日子里你的情绪通常更高"
  ],
  "correlation_findings": [
    {
      "factor": "光照水平",
      "correlation": 0.4,
      "description": "光照水平与情绪之间存在中等正相关"
    }
  ],
  "recommendations": [
    "在光线不足的时期尝试在光线充足的地方多待一些时间"
  ],
  "positive_highlights": [
    "你在挑战时期表现出了韧性"
  ]
}
```

### GET /export_data
以指定格式导出日记数据。

**查询参数：**
- `start_date`: 开始日期，格式为YYYY-MM-DD（可选）
- `end_date`: 结束日期，格式为YYYY-MM-DD（可选）
- `format`: 导出格式（json或csv）- 默认为'json'

## MCP配置

`mcp-config.json`文件包含用于MCP集成的工具配置。

## 说明

此实现使用模拟数据。在实际实现中，这将连接到实际的日记数据存储。