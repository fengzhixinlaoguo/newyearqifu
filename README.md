<div align="center">

# 灵签之路 🎋

<p align="center">
  <img src="https://img.shields.io/badge/智谱AI-GLM--4--Flash-blue?style=flat-square" alt="智谱AI">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen?style=flat-square" alt="Node">
  <img src="https://img.shields.io/badge/price-FREE-orange?style=flat-square" alt="Free">
</p>

<p align="center">
  <b>基于智谱AI免费模型的传统祈福应用</b>
</p>

<p align="center">
  传统文化 × 现代AI，为你的愿望指引方向
</p>

[在线演示](#) | [快速开始](#-快速开始) | [获取帮助](#-获取帮助)

</div>

---

## ✨ 项目特色

- 🎋 **传统文化** - 融合中国传统灵签文化，上上签、上吉签、中吉签
- 🤖 **AI解签** - 智谱GLM-4-Flash实时流式生成个性化解读
- 🆓 **完全免费** - 使用免费的GLM-4-Flash模型，无需付费
- 🖼️ **精美分享** - Puppeteer高清截图，一键生成分享卡片
- 📱 **移动优化** - 响应式设计，手机端完美适配
- 🔐 **安全可靠** - API Key后端隐藏，前端无法获取
- ⚡ **快速部署** - 5分钟完成配置，开箱即用

## 🎯 功能展示

### 主要功能

1. **祈福抽签** - 输入愿望，随机抽取灵签
2. **AI解签** - 智谱AI根据签文和愿望生成解读
3. **分享图片** - 生成精美的祈福卡片
4. **流式输出** - 实时显示AI解签过程

### 技术特点

- 🚀 流式响应 (SSE)
- 🎨 玻璃拟态设计
- 🌙 暗色模式支持
- 📊 Markdown 渲染
- 🔄 自动重试机制

## 🚀 快速开始

### 前置要求

- Node.js >= 16.0.0
- npm 或 yarn
- 智谱AI账号（免费注册）

### 安装步骤

#### 1️⃣ 克隆项目

```bash
git clone https://github.com/yourusername/fortune-sign.git
cd fortune-sign
```

#### 2️⃣ 安装依赖

```bash
npm install
```

#### 3️⃣ 获取API Key

> 🔥 **新手必看**：[如何获取智谱API-Key.md](./如何获取智谱API-Key.md) - 手把手教程

快速链接：访问 https://open.bigmodel.cn/ 注册并创建免费 API Key

#### 4️⃣ 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入你的 API Key：

```env
ZHIPU_API_KEY=你的智谱APIKey
PORT=3000
```

#### 5️⃣ 启动服务

```bash
# 使用启动脚本（推荐）
./start.sh

# 或使用 npm
npm start

# 开发模式（自动重启）
npm run dev
```

#### 6️⃣ 访问应用

打开浏览器访问：http://localhost:3000

看到 AI 解签内容，说明配置成功！🎉

## 📦 技术栈

| 技术 | 说明 |
|------|------|
| **后端** | Node.js + Express |
| **AI模型** | 智谱AI GLM-4-Flash (免费) |
| **图片生成** | Puppeteer |
| **前端** | 原生 HTML/CSS/JavaScript |
| **样式** | Tailwind CSS |
| **字体** | Google Fonts (中文衬线字体) |

## 🎨 API 接口

### POST /api/fortune

生成灵签和AI解析（SSE流式响应）

**请求**：
```json
{
  "wish": "新年事业顺利",
  "fortuneData": {
    "level": "上上签",
    "poem": "春来花发映阳台，万里书香自此开",
    "meaning": "龙腾虎跃上云霄"
  }
}
```

**响应**：Server-Sent Events 流式输出

### POST /api/render-card

生成分享图片

**请求**：
```json
{
  "level": "上上签",
  "poem": "春来花发映阳台|万里书香自此开",
  "wish": "新年事业顺利",
  "analysis": "AI解析内容"
}
```

**响应**：PNG 图片

### GET /api/health

健康检查

## 📖 详细文档

- 🔥 **[如何获取智谱API-Key.md](./如何获取智谱API-Key.md)** - 新手必看！详细图文教程
- 📚 **[智谱AI配置指南.md](./智谱AI配置指南.md)** - 配置步骤和常见问题
- ⚡ **[快速启动指南.md](./快速启动指南.md)** - 快速参考文档
- 🤝 **[CONTRIBUTING.md](./CONTRIBUTING.md)** - 贡献指南

## 🔐 安全说明

✅ API Key 存储在服务器端环境变量
✅ 前端无法访问 API Key
✅ 所有 AI 调用通过后端代理
✅ .env 文件已加入 .gitignore

**重要提示**：
- ❌ 不要将 `.env` 文件提交到 Git
- ❌ 不要在公开场合分享你的 API Key
- ✅ 定期更换 API Key 提高安全性

## 💰 费用说明

- GLM-4-Flash 模型：**完全免费** 🆓
- 无需付费即可使用所有功能
- 适合个人和小型项目使用

## 🗺️ Roadmap

- [x] 基础祈福功能
- [x] AI 解签
- [x] 分享图片生成
- [ ] 多语言支持
- [ ] 历史记录功能
- [ ] 自定义灵签库
- [ ] 黄历查询
- [ ] 运势分析

## 🤝 参与贡献

欢迎参与贡献！请查看 [贡献指南](./CONTRIBUTING.md)

**贡献方式**：
- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码

## 📝 License

本项目采用 [MIT](./LICENSE) 许可证。

## ❓ 获取帮助

- 📚 查看 [详细文档](#-详细文档)
- 🐛 提交 [Issue](https://github.com/yourusername/fortune-sign/issues)
- 💬 参与 [Discussions](https://github.com/yourusername/fortune-sign/discussions)
- 📧 联系智谱AI客服：support@zhipuai.cn

## 🙏 致谢

- [智谱AI](https://open.bigmodel.cn/) - 提供免费的GLM-4-Flash模型
- 所有贡献者 - 感谢你们的付出

## ⭐ Star History

如果这个项目对你有帮助，请给个 Star ⭐️

---

<div align="center">

**用 ❤️ 制作，用 🤖 赋能**

[⬆ 回到顶部](#灵签之路-)

</div>
