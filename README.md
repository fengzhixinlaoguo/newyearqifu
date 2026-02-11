# 新春祈福灵签 - 智谱AI免费版

## 🎯 项目简介

新春祈福灵签 - 使用智谱AI GLM-4-Flash免费模型的祈福应用

### ✨ 核心功能

- 🎋 **抽签祈福** - 上上签、上吉签、中吉签
- 🤖 **AI解签** - 智谱GLM-4-Flash实时流式生成解读
- 🖼️ **分享图片** - Puppeteer高清截图生成分享卡片
- 📱 **移动优化** - 响应式设计，手机端完美适配
- 🔐 **安全设计** - API Key后端隐藏，前端无法获取

### 🚀 快速开始

#### 1. 获取智谱 API Key

**新手必看**：[如何获取智谱API-Key.md](./如何获取智谱API-Key.md) - 手把手教你获取免费 API Key

**快速链接**：访问 https://open.bigmodel.cn/ 注册并创建免费 API Key

#### 2. 配置环境变量

编辑 `.env` 文件：

```env
ZHIPU_API_KEY=你的智谱APIKey
PORT=3000
```

#### 3. 启动服务

```bash
# 安装依赖（首次运行）
npm install

# 启动服务
./start.sh
# 或
npm start
```

#### 4. 访问应用

打开浏览器访问：http://localhost:3000

## 📦 技术栈

- **后端**: Node.js + Express
- **AI模型**: 智谱AI GLM-4-Flash (免费)
- **图片生成**: Puppeteer
- **前端**: 原生HTML/CSS/JavaScript

## 🎨 API接口

### POST /api/fortune

生成灵签和AI解析（流式响应）

**请求:**
```json
{
  "wish": "用户的愿望",
  "fortuneData": {
    "level": "上上签",
    "poem": "春来花发映阳台，万里书香自此开",
    "meaning": "龙腾虎跃上云霄"
  }
}
```

**响应:** Server-Sent Events (SSE) 流式输出

### POST /api/render-card

生成分享图片

**请求:**
```json
{
  "level": "上上签",
  "poem": "春来花发映阳台|万里书香自此开",
  "wish": "用户愿望",
  "analysis": "AI解析"
}
```

**响应:** PNG 图片

### GET /api/health

健康检查

## 📂 项目结构

```
newyearqifu/
├── server.js          # 后端服务（智谱AI代理）
├── index.html         # 祈福前端页面
├── ai-api.js          # API调用模块
├── render.html        # 图片渲染模板
├── .env              # 环境变量配置
├── .env.example      # 配置示例
├── package.json      # 项目依赖
└── README.md         # 项目文档
```

## 🔧 配置说明

### 环境变量

在 `.env` 文件中配置：

```env
# 智谱 API Key（必填）
ZHIPU_API_KEY=your-api-key-here

# 服务器端口（可选，默认3000）
PORT=3000
```

### API配置

项目默认配置（已在 `server.js` 中设置）：

```javascript
API端点: https://open.bigmodel.cn/api/paas/v4/chat/completions
模型: GLM-4-Flash
价格: 完全免费
```

## 🔐 安全特性

✅ API Key存储在服务器端环境变量
✅ 前端无法访问API Key
✅ 所有AI调用通过后端代理
✅ .env文件已加入.gitignore

## 📖 详细文档

- **[如何获取智谱API-Key.md](./如何获取智谱API-Key.md)** - 🔥 新手必看！手把手教你获取 API Key
- **[智谱AI配置指南.md](./智谱AI配置指南.md)** - 详细的配置步骤和常见问题
- **[快速启动指南.md](./快速启动指南.md)** - 快速参考文档

## ⚠️ 注意事项

- **不要**将 `.env` 文件提交到 Git
- **不要**在公开场合分享你的 API Key
- **定期更换** API Key 提高安全性

## 🆓 费用说明

- GLM-4-Flash 模型：**完全免费**
- 无需付费即可使用所有功能
- 适合个人和小型项目使用

## 📝 许可证

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request

---

**项目已配置为智谱AI免费模型，只需在.env填入API Key即可使用！** 🎋
