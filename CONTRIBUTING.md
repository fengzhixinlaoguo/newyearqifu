# 贡献指南

感谢你考虑为「灵签之路」贡献代码！

## 🤝 如何贡献

### 报告 Bug

如果你发现了 bug，请：

1. 先在 [Issues](https://github.com/yourusername/fortune-sign/issues) 中搜索是否已有相关问题
2. 如果没有，创建新的 Issue，包含：
   - 清晰的标题
   - 详细的问题描述
   - 复现步骤
   - 预期行为和实际行为
   - 系统环境（操作系统、Node.js 版本等）
   - 截图或错误日志（如果有）

### 提出新功能

1. 先创建一个 Issue 讨论你的想法
2. 说明为什么需要这个功能
3. 描述你建议的实现方式

### 提交代码

#### 开发流程

1. **Fork 项目**
   ```bash
   # 点击 GitHub 页面右上角的 Fork 按钮
   ```

2. **克隆你的 Fork**
   ```bash
   git clone https://github.com/your-username/fortune-sign.git
   cd fortune-sign
   ```

3. **创建新分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

4. **安装依赖**
   ```bash
   npm install
   ```

5. **配置环境变量**
   ```bash
   cp .env.example .env
   # 编辑 .env 填入你的智谱 API Key
   ```

6. **进行修改并测试**
   ```bash
   npm start
   # 确保功能正常工作
   ```

7. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加新功能描述"
   # 或
   git commit -m "fix: 修复某个bug"
   ```

8. **推送到你的 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

9. **创建 Pull Request**
   - 访问你的 Fork 页面
   - 点击 "New Pull Request"
   - 填写 PR 描述，说明你的更改

#### Commit 规范

请使用语义化的 commit message：

- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式调整（不影响功能）
- `refactor:` 代码重构
- `perf:` 性能优化
- `test:` 测试相关
- `chore:` 构建/工具相关

**示例**：
```bash
feat: 添加农历日期显示
fix: 修复移动端布局错误
docs: 更新 API Key 获取教程
```

### 代码规范

- 使用 2 空格缩进
- 变量命名使用驼峰命名法
- 函数功能单一，保持简洁
- 添加必要的注释
- 保持代码风格与项目一致

### Pull Request 检查清单

提交 PR 前请确认：

- [ ] 代码已在本地测试通过
- [ ] 遵循了项目的代码规范
- [ ] 更新了相关文档（如果需要）
- [ ] Commit message 符合规范
- [ ] 没有引入新的警告或错误
- [ ] 没有提交敏感信息（API Key 等）

## 📝 文档贡献

文档改进同样重要！如果你发现：

- 错别字或语法错误
- 不清晰的说明
- 缺少的文档
- 可以改进的教程

欢迎提交 PR 改进文档。

## 🎨 UI/UX 改进

如果你有设计建议：

1. 先创建 Issue 讨论
2. 如果可能，提供设计稿或原型
3. 说明改进的理由

## ❓ 问题讨论

如果你不确定如何实现，或者需要帮助：

1. 在 Discussions 中发起讨论
2. 或者在相关 Issue 中留言
3. 我们会尽快回复

## 🙏 感谢

感谢所有为「灵签之路」贡献的开发者！

你的每一个贡献，无论大小，都让这个项目变得更好 ❤️
