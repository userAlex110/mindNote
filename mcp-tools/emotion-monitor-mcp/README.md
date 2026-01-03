# 情绪监测MCP工具

这是一个用于环境监测的MCP（Model Context Protocol）工具。它提供当前和历史环境数据，包括温度、湿度、光照水平和天气状况。

## 功能

- 获取当前室内和室外环境数据
- 检索历史环境数据
- 演示用的模拟传感器数据

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

服务器默认在端口3001上启动。

## API端点

### GET /get_current_environment
获取当前环境数据。

**响应：**
```json
{
  "indoor": {
    "temperature": 23.5,
    "humidity": 45,
    "light_level": 300,
    "timestamp": "2023-10-01T10:00:00.000Z"
  },
  "outdoor": {
    "weather": "晴天",
    "weather_code": 100,
    "temperature": 25.2,
    "humidity": 52,
    "wind_speed": 3.2
  }
}
```

### GET /get_environment_history
获取历史环境数据。

**查询参数：**
- `start_date`: 开始日期，格式为YYYY-MM-DD（可选）
- `end_date`: 结束日期，格式为YYYY-MM-DD（可选）

**响应：**
```json
[
  {
    "timestamp": "2023-10-01T10:00:00.000Z",
    "temperature": 23.5,
    "humidity": 45,
    "light_level": 300
  }
]
```

## MCP配置

`mcp-config.json`文件包含用于MCP集成的工具配置。

## 说明

此实现使用模拟数据。在实际实现中，这将连接到实际传感器和天气API。