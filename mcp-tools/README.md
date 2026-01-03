# mindNote MCP 工具

这个仓库包含了mindNote项目的MCP（Model Context Protocol）工具 - 一个情感健康助手，帮助用户追踪情绪和环境，提供洞察和建议。

## 概述

mindNote MCP工具包含三个主要组件：

1. **日记记录MCP** - 用于记录和管理情绪日记条目
2. **情绪监测MCP** - 用于监测环境条件
3. **洞察生成MCP** - 基于日记条目生成洞察

## 组件

### 1. 日记记录MCP (`/diary-record-mcp`)

这个工具允许用户记录带有情绪评分、标签和环境数据的情绪日记条目。

**主要功能：**
- 记录情绪日记条目
- 查询日记条目
- 更新现有条目
- 删除日记条目

**API端点：**
- `POST /record_emotion_diary` - 记录新的情绪日记条目
- `GET /get_emotion_diary` - 查询情绪日记条目
- `PUT /update_emotion_diary/:diary_id` - 更新现有日记条目
- `DELETE /delete_emotion_diary/:diary_id` - 删除日记条目

### 2. 情绪监测MCP (`/emotion-monitor-mcp`)

这个工具提供环境监测功能，包括温度、湿度、光照水平和天气数据。

**主要功能：**
- 获取当前室内和室外环境数据
- 查询历史环境数据

**API端点：**
- `GET /get_current_environment` - 获取当前环境数据
- `GET /get_environment_history` - 获取历史环境数据

### 3. 洞察生成MCP (`/insight-generator-mcp`)

这个工具分析日记条目以提供洞察、趋势分析和建议。

**主要功能：**
- 基于日记条目生成情绪洞察
- 分析情绪趋势
- 以JSON或CSV格式导出日记数据
- 提供改进建议和积极鼓励

**API端点：**
- `GET /get_emotion_insights` - 基于日记条目获取情绪洞察
- `GET /get_trend_analysis` - 获取趋势分析
- `GET /export_data` - 导出日记数据

## 使用方法

每个MCP工具都是一个独立的Node.js应用程序，可以独立运行：

```bash
# 进入工具目录
cd diary-record-mcp

# 安装依赖
npm install

# 启动服务器
npm start
```

每个工具运行在不同的端口上：
- 日记记录MCP: 端口 3000
- 情绪监测MCP: 端口 3001
- 洞察生成MCP: 端口 3002

## MCP配置

每个工具都包含一个`mcp-config.json`文件，定义了该工具的MCP接口，包括可用函数及其参数。

## 与AI助手集成

这些MCP工具设计用于与支持Model Context Protocol的AI助手集成，允许AI记录情绪、监测环境条件，并为用户生成洞察。