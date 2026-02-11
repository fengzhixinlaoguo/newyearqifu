# 祈福灵签 - 智谱 AI 配置指南

## 🎯 已配置为智谱 AI GLM-4-Flash 免费模型

### 模型信息
- **服务商**: 智谱 AI
- **模型**: GLM-4-Flash
- **价格**: 🆓 **完全免费**
- **特点**:
  - 响应速度快
  - 完全免费使用
  - 支持流式输出
  - 适合实时对话场景

### 🔑 快速开始

#### 1. 获取智谱 API Key

**新手用户请先阅读**：[如何获取智谱API-Key.md](./如何获取智谱API-Key.md) - 详细图文教程

**快速步骤**：
1. 访问智谱 AI 开放平台：https://open.bigmodel.cn/
2. 注册/登录账号
3. 进入控制台 → API Keys
4. 点击"创建新的 API Key"
5. 复制生成的 API Key

#### 2. 配置 API Key

编辑项目根目录下的 `.env` 文件：

```bash
cd /Users/guozengguang/ai/develop/project/newyearqifu
vi .env
```

将 `your-zhipu-api-key-here` 替换为你的真实 API Key：

```env
# 智谱 AI API 配置（GLM-4-Flash 免费模型）
ZHIPU_API_KEY=你复制的APIKey

# 服务器配置
PORT=3000
```

**示例：**
```env
ZHIPU_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.abcdefghijklmnop
PORT=3000
```

#### 3. 启动服务

```bash
# 方式一：使用启动脚本
./start.sh

# 方式二：使用 npm
npm start

# 方式三：开发模式
npm run dev
```

#### 4. 验证配置

启动后，如果看到以下信息，说明配置成功：

```
✅ 成功: 已从环境变量加载智谱 API Key
🔑 API_KEY: a1b2c3d4******ijklmnop
🤖 使用模型: GLM-4-Flash (免费)
✅ 祈福服务已启动: http://localhost:3000
```

如果看到以下错误，说明还需要配置：

```
⚠️ 错误: 智谱 API Key 未配置！
📝 请按以下步骤配置:
   1. 访问 https://open.bigmodel.cn/ 注册并获取 API Key
   2. 编辑 .env 文件，设置 ZHIPU_API_KEY=你的API Key
   3. 重新启动服务器
```

### 📊 API 配置详情

当前项目已配置的 API 信息：

```javascript
端点: https://open.bigmodel.cn/api/paas/v4/chat/completions
模型: GLM-4-Flash
认证: Bearer Token (从 .env 读取)
```

### 🎨 使用流程

1. **访问应用**: http://localhost:3000
2. **输入愿望**: 在页面输入你的新年愿望
3. **抽取灵签**: 点击抽签按钮
4. **AI 解签**: GLM-4-Flash 实时生成解签内容
5. **生成分享图**: 自动生成精美分享卡片

### 🔧 常见问题

#### Q1: API Key 在哪里获取？
访问 https://open.bigmodel.cn/ 注册账号后，在控制台创建 API Key。

#### Q2: GLM-4-Flash 是否真的免费？
是的，完全免费使用，无需付费。

#### Q3: 如何切换其他模型？
如果想使用其他智谱模型，修改 `server.js` 第18行：
```javascript
const MODEL = 'GLM-4-Flash';  // 改为其他模型名称，如 'glm-4'
```

可用模型参考：https://open.bigmodel.cn/dev/api#model-list

#### Q4: API 调用失败怎么办？
1. 检查 API Key 是否正确
2. 检查网络连接
3. 查看服务器日志中的错误信息
4. 确认智谱 AI 服务状态

#### Q5: 如何修改端口？
编辑 `.env` 文件中的 `PORT` 值：
```env
PORT=3001  # 改为其他端口
```

### 🔐 安全提醒

⚠️ **重要**：
- `.env` 文件包含你的 API Key，已加入 `.gitignore`
- **绝对不要**将 `.env` 提交到 Git
- **不要**在公开场合分享你的 API Key
- **定期更换** API Key 提高安全性

### 📦 完整配置示例

`.env` 文件完整配置示例：

```env
# 智谱 AI API 配置（GLM-4-Flash 免费模型）
# 获取 API Key: https://open.bigmodel.cn/
ZHIPU_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.abcdefghijklmnop

# 服务器配置
PORT=3000
```

### ✅ 验证清单

配置完成后，请确认：

- [ ] 已在 https://open.bigmodel.cn/ 注册账号
- [ ] 已获取 API Key
- [ ] 已编辑 `.env` 文件，填入真实 API Key
- [ ] 已保存 `.env` 文件
- [ ] 已启动服务 (`npm start` 或 `./start.sh`)
- [ ] 控制台显示"✅ 成功: 已从环境变量加载智谱 API Key"
- [ ] 可以在浏览器访问 http://localhost:3000
- [ ] AI 解签功能正常工作

### 🚀 下一步

配置完成后，访问应用开始使用：

```bash
# 在浏览器打开
open http://localhost:3000
```

或者直接在浏览器输入：http://localhost:3000

---

**项目已完全配置为智谱 AI GLM-4-Flash 免费模型！**

只需在 `.env` 中填入你的智谱 API Key 即可开始使用！🎋
