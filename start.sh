#!/bin/bash

# 祈福灵签 - 快速启动脚本

echo "🎋 祈福灵签 - 启动中..."
echo ""

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未安装 Node.js"
    echo "请访问 https://nodejs.org 下载安装"
    exit 1
fi

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "📦 首次运行,正在安装依赖..."
    npm install
    echo ""
fi

# 检查环境变量
if [ ! -f ".env" ]; then
    echo "⚠️  警告: 未找到 .env 文件"
    echo "正在从示例文件创建..."
    cp .env.example .env
    echo ""
    echo "⚠️  请编辑 .env 文件,填入真实的 API Key"
    echo "然后重新运行此脚本"
    exit 1
fi

# 启动服务器
echo "✅ 启动服务器..."
echo ""
node server.js
